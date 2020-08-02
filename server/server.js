'use strict'

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
    database: conf.database,
    multipleStatements: true
});

connection.connect();

app.get('/api/plant1', (req, res) => {
    connection.query(
        'SELECT co2 FROM iot.plant1 ORDER BY id DESC LIMIT 1;',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/plant2', (req, res) => {
    connection.query(
      'SELECT co2, humidity, temperature FROM iot.plant2 ORDER BY id DESC LIMIT 1;',
      (err, rows, fields) => {
          res.send(rows);
      }
    )
});

app.get('/api/plant3', (req, res) => {
    connection.query(
      'SELECT co2, humidity, temperature FROM iot.plant3 ORDER BY id DESC LIMIT 1;',
      (err, rows, fields) => {
          res.send(rows);
      }
    )
});

app.get('/api/environmentFromPlant', (req, res) => {
    const measurement = req.query['measurement'];
    const sql = req2query(req.query);
    let data = new Array();

    connection.query(
        sql, (err, rows, fields) => {
            let results = Object.values(JSON.parse(JSON.stringify(rows)));
            results.forEach((result, index= null, arr = null) => {
                let row = result.map((v, idx = null, arr = null) => {
                    return v[measurement];
                });
                data.push(row);
            });
            res.send(data);
        });
});

function req2query(req_params){
    const measurement =req_params['measurement'];
    const plants = req_params['plants'];

    if (plants.length > 1){
        let sqls = plants.map((plant, index, arr) => {
            return `SELECT ${measurement} FROM iot.${plant} ORDER BY id DESC LIMIT 100;`;
        });
        return sqls.join(" ");
    }

    return `SELECT ${measurement} FROM iot.${plants} ORDER BY id DESC LIMIT 100;`;
}

app.listen(PORT, () => {
    console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
})