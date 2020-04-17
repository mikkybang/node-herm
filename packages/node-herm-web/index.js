const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(session({ 
    secret: 'no_seceret',
    resave: true,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/model/', function (req, res) {
    res.render('pages/model/index', {
        data: req.session.data
    });
});

app.get('/model/add', function (req, res) {
    res.render('pages/model/add', { 
        data: req.session.data,
        model: {
            name: '', properties: [
                { 
                    name: '', type: ''
                }
            ],
        }
    });
});

app.post('/model/add', function (req, res) {
    let properties= [];
    const { propertyNames, propertyTypes } = req.body;
    
    if (Array.isArray(propertyNames)) {
        propertyNames.forEach((e, i) => {
            properties.push({
                name: e, type: propertyTypes[i]
            });
        });
    } else {
        properties.push({ name: propertyNames, type: propertyTypes });
    }

    const data = req.session.data || { models: [] };
    req.session.data = { 
        ...data, 
        models: [
            ...data.models, 
            {
                name: req.body.modelName,
                properties
            }
        ] 
    }
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect('/model/');
});

app.listen(8080);
console.log('Server started on port 8080');