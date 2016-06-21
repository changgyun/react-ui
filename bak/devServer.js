var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/'));
});

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(8080, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8080');
});