'use strict'

const {socketIoPort:PORT} = require('../PROPERTIES');

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./server/db_conf.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    multipleStatements: true
});

connection.connect();
const io = require('socket.io').listen(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on('sendSwitchControl', (switchStatus) => {
    console.log('switch socket has been sent.');
    console.log(switchStatus);
    io.emit('receiveSwitchControl', switchStatus);
  })
});


const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1',{clientId: "webClient"});


client.subscribe(['Temperature', 'Humidity', 'CO2', 'Current']);

client.on('connect', (packet) => {
  console.log(packet)
})

client.handleMessage = function(packet, done) {
  const {topic, payload} = packet;
  console.log(topic, payload.toString());
  done();
}

client.on('message', (topic, message) => {
    console.log(topic, message.toString());
    console.log('message accepted!');
})


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

app.get('/api/getSwitch', (req, res) => {
  const table = req.query['table'];
  const selects = req.query['selects'].join(",");
  const num = req.query['num'];
  const machine = req.query['machine'];
  connection.query(
    `SELECT ${selects} FROM iot.${table} WHERE machine = \"${machine}\" ORDER BY id DESC LIMIT ${num};`,
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
        const date = Object.values(row)[0]
        return moment.utc(date).format('YYYY/MM/DD HH:mm:ss');
      })
      res.send(result);
    }
  )
});



app.get('/api/getEnvironmentHistory', (req, res) => {
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

app.get('/api/getSwitchHistory', (req, res) => {
  const selects = req.query['selects'].join(",");
  const num = req.query['num'];
  connection.query(
    `SELECT ${selects} FROM iot.switch ORDER BY id DESC LIMIT ${num};`,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});


app.post('/api/switchMachine', (req, res) => {
  let sql = 'INSERT INTO switch VALUES (null, ?, ?, now(), 0)';
  let machine = req.body.params['machine'];
  let status = req.body.params['status'];
  let params = [machine, status];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.post('/api/applySettings', (req, res) => {
  const sql = 'INSERT INTO iot.setting (id, humidity_min, humidity_max, temperature_min, temperature_max, co2_min, co2_max,  created, isDeleted) VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)';
  const settings = req.body.params['settings'];
  const params = [settings['humidity'][0], settings['humidity'][1], settings['temperature'][0], settings['temperature'][1],
    settings['co2'][0],settings['co2'][1]]
  connection.query(sql, params,
    (err, rows, fields) => {
    console.log(rows)
      res.send(rows);
    }
  )
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

