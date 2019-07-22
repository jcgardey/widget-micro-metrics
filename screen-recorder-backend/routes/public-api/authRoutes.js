const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google',
            {
                scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                ],
                prompt: 'select_account'
            }
        )
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log('req user: ', req.user);
            res.redirect('/');
        }
    );

    app.post('/api/users/signin', passport.authenticate('local-login', {
        //redirect if needed
    }),(req, res) => {
        console.log('req user: ', req.user);
        if (req.user) {
            delete req.user.password;
            res.status(200).send(req.user)
        }
        res.status(500).send({data: 'User no enviado.'});
    });

    app.post('/api/users/signup', passport.authenticate('local-signup', {

        //successRedirect : '/', // redirect to the secure profile section
        //failureRedirect : '/', // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages

    }), (req, res) => {
        console.log('req.user: ', req.user);
        if (req.user) {
            res.status(200).send(req.user)
        } else {
            console.log('signup failed');
        }
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
