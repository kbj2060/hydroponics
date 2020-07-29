const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./server/db_conf.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database

});

connection.connect();

app.get('/api/temperature', (req, res) => {
    connection.query(
        'SELECT * FROM iot.temperature',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(PORT, () => {
    console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
})