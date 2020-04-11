const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ 
    secret: 'no_seceret',
    resave: true,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/add/model', function (req, res) {
    res.render('pages/add-model', { data: req.session.data });
});

app.listen(8080);
console.log('Server started on port 8080');