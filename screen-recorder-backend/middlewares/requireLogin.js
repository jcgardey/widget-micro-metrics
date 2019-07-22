module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error: 'Por favor, inicia sesión para continuar'});
    }
    next();
};
