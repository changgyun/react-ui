var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('express-error-handler'),
    passport = require('passport'),
    TumblrStrategy = require('passport-tumblr').Strategy,
    TUMBLR_CONSUMER_KEY = "tiR2XYIkXPsuYbtvDIQGR1k5iC4YBRdKxSvlZZW2jNzcxkoRtb",
    TUMBLR_SECRET_KEY = "4ZFxJLcWJSQHd93mvc3Pl20A1hQi4i6nFgCA7JMpgJHybnJxJB",
    session = require('express-session');

/*
var webpack = require('webpack');
var config = require('./webpack.config.dev');
*/

var app = module.exports = express();

/*
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
*/

app.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new TumblrStrategy({
        consumerKey: TUMBLR_CONSUMER_KEY,
        consumerSecret: TUMBLR_SECRET_KEY,
        callbackURL: "http://172.21.81.189:3000/auth/tumblr/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log("token:" + token); // 인증 이후 auth token을 출력할 것이다.
        console.log("token secret:" + tokenSecret); // 인증 이후 auto token secret을 출력할 것이다.
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

app.get('/auth/tumblr',
    passport.authenticate('tumblr'),
    function(req, res){
        // The request will be redirected to Tumblr for authentication, so this
        // function will not be called.
    });

app.get('/auth/tumblr/callback',
    passport.authenticate('tumblr', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.use(express.static(__dirname + '/dist'));
app.use(methodOverride());
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8081, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8081');
});