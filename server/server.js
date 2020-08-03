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


app.get('/api/getStatus', (req, res) => {
    const table = req.query['table'];
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];

    connection.query(
      `SELECT ${selects} FROM iot.${table} ORDER BY id DESC LIMIT ${num};`,
      (err, rows, fields) => {
          res.send(rows);
      }
    )
});

app.get('/api/getDate', (req, res) => {
  const table = req.query['table'];
  const num = req.query['num'];

  connection.query(
    `SELECT created FROM iot.${table} ORDER BY id DESC LIMIT ${num};`,
    (err, rows, fields) => {
      let result = rows.map((row, index, arr) => {
        return Object.values(row);
      })
      res.send(result);
    }
  )
});

app.get('/api/getHistory', (req, res) => {
    const environment = req.query['selects'];
    const sql = req2query(req.query);
    let data = new Array();

    connection.query(
        sql, (err, rows, fields) => {
            let results = Object.values(JSON.parse(JSON.stringify(rows)));
            results.forEach((result, index= null, arr = null) => {
                let row = result.map((v, idx = null, arr = null) => {
                  return v[environment];
                });
                data.push(row);
            });
            res.send(data);
        });
});

function req2query(req_params){
    const selects = req_params['selects'];
    const tables = req_params['table'];

    if (tables.length > 1){
        let sqls = tables.map((table, index, arr) => {
            return `SELECT ${selects}, created FROM iot.${table} ORDER BY id DESC LIMIT 100;`;
        });
        return sqls.join(" ");
    }

    return `SELECT ${selects}, created FROM iot.${table} ORDER BY id DESC LIMIT 100;`;
}

app.listen(PORT, () => {
    console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
})