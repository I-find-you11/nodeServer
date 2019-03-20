var express = require('express');
var fs = require('fs');
const api = require('./api/api');
const router = require('./api/router');
const bodyParser = require('body-parser');

var app = express();


app.use('/static',express.static('static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname));
api(app);
router(app);
app.listen('8000');

console.log('服务启动成功');