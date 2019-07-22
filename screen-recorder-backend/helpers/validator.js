const _ = require('lodash');
const Exceptions = require('./errors');

const ValidationError = Exceptions.ValidationError;

const safeApplyCondition = (condition, name, negated) => {
    return (something, message) => {
        if (!condition(something)) {
            throw new ValidationError(message || `Validation error ${something} must ${(negated ? ' not ' : ' ')} be ${name.toLowerCase()}`);
        }
        return something;
    };
};

const _mapToSafeFunction = (result, func, funcName) => {
    if (!/^(isNot).*/.test(funcName) && /^is.*/.test(funcName)) {

        const is = _.take(funcName, 2).join('');
        const name = _.drop(funcName, 2).join('');

        result[is + name] = safeApplyCondition(func, name, false);

        result[`${is}Not${name}`] = safeApplyCondition(_.negate(func), name, true);
    }
};

const Validator = _(_)
    .pick((value, key) => {
        return /^is.*/.test(key);
    })
    .transform(_mapToSafeFunction)
    .value();

Validator.Error = ValidationError;

module.exports = Validator;
