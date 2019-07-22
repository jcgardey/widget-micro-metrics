const mongoose = require('mongoose');
const model = require('../../models/Log');
const rrwebModel = require('../../models/Rrweb');

module.exports = app => {
    app.post('/api/logger', (req, res, next) => {
        let newLog;
        req.body.events = JSON.parse(req.body.events);
        req.body.answers = mongoose.Types.ObjectId(req.body.answers);
        var log = new model.Log(req.body);
        log.save((err, saved) => {
            if (err) {
                console.log('error: ', err);
            }
            newLog = saved;
        }).then(
            () => res.send(newLog)
        )
    });

    app.get('/api/logger/rrweb', (req, res, next) => {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
        rrwebModel.Rrweb.findOne({screencastId: req.query.screencastId}).then(
            data => {
                console.log('data events: ', data.events);
                res.send(data.events);
            }
        ).catch(next);
    });

    app.post('/api/logger/rrweb', (req, res, next) => {
        const data = JSON.parse(req.body.data);
        console.log (data.events)
        var query = {screencastId: data.screencastId},
            update = {
                screencastId: data.screencastId,
                screencastName: data.screencastName,
                $push: {events: {$each: data.events}}
            },
            options = {upsert: false};

        rrwebModel.Rrweb.findOneAndUpdate(query, update, options, (error, result) => {
            if (!error) {
                //If the document doesn't exist
                if (!result) {
                    //Create

                    result = new rrwebModel.Rrweb({
                        screencastId: data.screencastId,
                        screencastName: data.screencastName,
                        events: data.events,
                        url: data.url
                    });
                    console.log('Nuevo elemento creado');

                    result.save((error, saved) => {
                        if (error) {
                            throw error;
                        }
                    });
                }
            }
        });

        /**
        let test = new rrwebModel.Rrweb({
            events: req.body.events,
            id: req.body.id,
            name: req.body.name
        });

        test.save((err, saved) => {
            if (err) console.log(err);
            console.log('saved: ', saved);
            logged = saved;
        }).then(
            () => res.send(logged)
        )*/
    });
};
