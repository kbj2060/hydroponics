'use strict'

const {socketIoPort:PORT} = require('../PROPERTIES');

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const fs = require('fs');
const mysql = require('mysql');
const mqtt = require('mqtt');
const app = express();
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
})
const io = require('socket.io').listen(server);

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


io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on('sendSwitchControl', (switchStatus) => {
    console.log('switch socket has been sent.');
    console.log(switchStatus);
    io.emit('receiveSwitchControl', switchStatus);
  })
});

const client = mqtt.connect('mqtt://127.0.0.1',{port: 1883, clientId: "webClient"});

/*
mqtt data send example
topic : current
data : {
  "led_current_1":"213",
  "led_current_2" : "1212",
  "led_current_3":"123",
  "led_current_4" : "1212",
  "airconditioner_current_1" : "1212",
  "airconditioner_current_2" : "1212"
}
 */
const handleCurrentsMQTT = (topic, message) => {
  const jsonMessage = JSON.parse(message.toString());
  const sql = `INSERT INTO iot.${topic} VALUES 
  (null, ${jsonMessage['led_current_1']}, 
   ${jsonMessage['led_current_2']}, ${jsonMessage['led_current_3']},
    ${jsonMessage['led_current_4']}, ${jsonMessage['airconditioner_current_1']},
    ${jsonMessage['airconditioner_current_2']}, now(), 0);`;
  connection.query(sql,
    (err, rows) => {
      console.log(rows);
    }
  )
}

/*
mqtt data send example
topic : plant1
data : {
  "temperature":"213",
  "humidity" : "1212",
  "co2":"123"
}
 */
const handlePlantEnvironmentsMQTT = (topic, message) => {
  const jsonMessage = JSON.parse(message.toString());
  const sql = `INSERT INTO iot.${topic} VALUES (null, now(), ${jsonMessage['co2']}, 
  ${jsonMessage['humidity']}, ${jsonMessage['temperature']}, 0);`;
  connection.query(sql,
    (err, rows) => {
      console.log(rows);
    }
  )
}

client.on('message', (topic, message) => {
  if(topic.includes("plant")){
    handlePlantEnvironmentsMQTT(topic, message);
  }
  else if (topic === 'current'){
    handleCurrentsMQTT(topic, message);
  }
  else{
    console.log('topic error occurred.')
  }
})

client.on('connect', (packet) => {
  client.subscribe(["plant1", "plant2", "plant3", "current"],  function (err) {
    if (!err) { client.publish('presence', 'subscribe error occurred') }
  });
})

client.on("error", (error) => {
  console.log("Can't connect" + error);
})


app.get('/api/getStatus', (req, res) => {
    const table = req.query['table'];
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    connection.query(
      `SELECT ${selects} FROM iot.${table} ORDER BY id DESC LIMIT ${num};`,
      (err, rows) => {
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
    (err, rows) => {
      res.send(rows);
    }
  )
});


app.get('/api/getDate', (req, res) => {
  const table = req.query['table'];
  const num = req.query['num'];

  connection.query(
    `SELECT created 
    FROM iot.${table} ORDER BY id DESC LIMIT ${num};`,
    (err, rows) => {
      let result = rows.map((row) => {
        const date = Object.values(row)[0]
        return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss');
      })
      res.send(result);
    }
  )
});

app.get('/api/getEnvironmentHistory', (req, res) => {
    const [environment] = req.query['selects'];
    const sql = envHistoryReq2query(req.query);
    let data = new Object({});
    let arr = new Array();
    connection.query(
        sql, (err, rows) => {
          let results = Object.values(JSON.parse(JSON.stringify(rows)));
          results.forEach((result) => {
              result.forEach((dictRow) => {
                const date = getLocaleMoment(dictRow['created']);
                data[date] = dictRow[environment];
              });
              arr.push(data);
              data = new Object({});
          });
          res.send(arr);
        });
});

app.get('/api/getSwitchHistory', (req, res) => {
  const selects = req.query['selects'].join(",");
  const num = req.query['num'];
  connection.query(
    `SELECT ${selects} FROM iot.switch ORDER BY id DESC LIMIT ${num};`,
    (err, rows) => {
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
    (err, rows) => {
      res.send(rows);
      client.publish(machine, status?'1':'0');
    }
  )
});

app.post('/api/applySettings', (req, res) => {
  const sql = 'INSERT INTO iot.setting (id, humidity_min, humidity_max, temperature_min, temperature_max, co2_min, co2_max,  created, isDeleted) VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)';
  const settings = req.body.params['settings'];
  const params = [settings['humidity'][0], settings['humidity'][1], settings['temperature'][0], settings['temperature'][1],
    settings['co2'][0],settings['co2'][1]]
  connection.query(sql, params,
    (err, rows) => {
    console.log(rows)
      res.send(rows);
    }
  )
});

function getLocaleMoment(date) {
  return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss');
}

function envHistoryReq2query(req_params){
  const [environment] = req_params['selects'];
  const tables = req_params['table'];

  if (tables.length > 1){
    let sqls = tables.map((table) => {
      return `SELECT ${environment}, created
      FROM iot.${table} 
      WHERE DATE_FORMAT(iot.${table}.created, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') 
      ORDER BY id DESC ;`;
    });
    return sqls.join(" ");
  }
  return `SELECT ${environment} 
  FROM iot.${table} 
  WHERE DATE_FORMAT(iot.${table}.created, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') 
  ORDER BY id DESC ;`;
}

