///api/answers

const model = require('../../models/Answer');


module.exports = app => {

    app.post('/api/answers', (req, res, next) => {
        let answersToReturn = "";
        const answers = new model.Answer(req.body);
        answers.save((err, answers) => {
            answersToReturn = answers;
        }).then(
            () => res.send(answersToReturn._id)
        )
    });
};
