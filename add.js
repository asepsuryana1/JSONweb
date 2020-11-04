const express = require('express');
const app = express();
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
let fs = require('fs');
const readData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (readData) => fs.writeFileSync('./data.json', JSON.stringify(readData, null, 3), 'utf8');


app.use(bodyParser.urlencoded({
    extended: false
}))


// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.render('index', { json: readData })
});

app.get('/AddData', function (req, res) {
    res.render('AddData')
});
// app.get('/EditData', function (req, res) {
//     res.render('EditData', { json: writeData })
// });

app.post('/AddData', (req, res) => {
    readData.push({
        string: req.body.string,
        integer: parseInt(req.body.integer),
        float: parseFloat(req.body.float),
        date: req.body.date,
        boolean: JSON.parse(req.body.boolean)
    })

    writeData(readData);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let id = parseInt(req.params.id)
    readData.splice(id, 1);
    writeData(readData);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('berjalan di lokal host 3000')
})