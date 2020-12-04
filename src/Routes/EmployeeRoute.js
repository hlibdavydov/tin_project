const EmployeeController = require('../Controllers/EmployeeController');
const express = require('express')
const app = express();

app.post('/', function (req, res) {
    console.log('chuj');
    res.send("chuj");
})
