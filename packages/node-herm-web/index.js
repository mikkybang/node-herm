var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(8080);
console.log('Server started on port 8080');