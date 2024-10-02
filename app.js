const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router'); 
const app = express();


app.use(express.static('public'));


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);


app.listen(8080, () => {
    console.log('Server initialized on http://localhost:8080');
});