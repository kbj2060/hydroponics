'use strict'
const INIT_SETTING_PATH = "../init_setting";
const LOGGER_PATH = "./utils/useLogger";
const DB_CONF_PATH = "./server/db_conf.json";

const {socketIoPort:PORT} = require(INIT_SETTING_PATH),
       express = require('express'),
       bodyParser = require('body-parser'),
       moment = require('moment'),
       fs = require('fs'),
       mysql = require('mysql');
const mqtt = require('mqtt'),
       app = express(),
       server = app.listen(PORT, () => {
          console.log(`${PORT}번 port에 http server를 띄웠습니다.`)
        }),
       io = require('socket.io').listen(server),
       data = fs.readFileSync(DB_CONF_PATH),
       conf = JSON.parse(data),
       connection = mysql.createConnection({
          host: conf.host,
          user: conf.user,
          password: conf.password,
          port: conf.port,
          database: conf.database,
          multipleStatements: true
       });
const {useInfoLogger, useErrorLogger} = require(LOGGER_PATH);
const {machines, plants, serverSubscribe} = require(INIT_SETTING_PATH)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect();


io.on("connection", function (socket) {
  useInfoLogger('socket').info({
    level: 'info',
    message: `Socket ID : ${socket.id} connected.`
  })

  socket.on('sendSwitchControl', (switchStatus) => {
    console.log('switch socket has been sent.');
    console.log(switchStatus);
    useInfoLogger('socket').info({
      level: 'info',
      message: `Socket ID : ${socket.id} Switch Control.`
    })
    io.emit('receiveSwitchControl', switchStatus);
  })

  socket.on('disconnect', function(){
    socket.disconnect();
    useInfoLogger('socket').info({
      level: 'info',
      message: `Socket ID : ${socket.id} disconnected.`
    })
  });
});

const client = mqtt.connect('mqtt://127.0.0.1',{port: 1883, clientId: "webClient"});

/*
mqtt data send example
topic : CURRENT/{machine}/{section}
data : 2.3
 */
const handleCurrentsMQTT = (topic, message) => {
  const current = JSON.parse(message.toString());
  const [table, machine, section] = topic.split("/")
  const sql = `INSERT INTO iot.${table} VALUES (null, ${machine}, ${section}, ${current}, now(), 0);`
  connection.query(sql,
    (err, rows) => {
      console.log(rows);
    }
  )
}

/*
mqtt data send example
topic : ENV/plant/{section}
data : {
  "temperature":"213",
  "humidity" : "1212",
  "co2":"123"
}
 */
const handlePlantEnvironmentsMQTT = (topic, message) => {
  const _json = JSON.parse(message.toString());
  const [table, _, section] = topic.split("/")
  const sql = `INSERT INTO iot.${table}
              VALUES (null, ${section}, ${_json['co2']}, ${_json['humidity']}, ${_json['temperature']}, now(), 0);`;
  connection.query(sql, (err, rows) => {
      console.log(rows);
    }
  )
}

/*
mqtt data send example
topic : SWITCH/{machine}
data : '1' or '0'
 */
// TODO : 오토매직 모듈에서 스위치 전환 시, DB 저장 / dispatch switchControl
const handleSwitchesMQTT = (topic, message, clientId) => {
  const [table, machine] = topic.split("/")
  if(clientId === 'Auto') {
    const status = JSON.parse(message.toString());
    const sql = `INSERT INTO iot.${table} 
                 VALUES (null, \"${machine}\", ${status}, \"${clientId}\", now(), 0);`
    connection.query(sql, (err, rows) => {
      console.log(rows);
    })
  }
}

client.on('message', (topic, message) => {
  try{
    const clientId = client.options.clientId;
    if(topic.includes("ENV")){
      handlePlantEnvironmentsMQTT(topic, message);
    } else if (topic.includes("CURRENT")){
      handleCurrentsMQTT(topic, message);
    } else if (topic.includes("SWITCH")){
      handleSwitchesMQTT(topic, message, clientId);
    }
  } catch (err){
    useErrorLogger('MQTT').error({
      level: 'error',
      message: `MQTT PUBLISH ERROR : ${err}`
    })
  }
})

client.on('connect', (packet) => {
  client.subscribe(serverSubscribe,  function (err) {
    if(err){
      useErrorLogger('MQTT').error({
        level: 'error',
        message: `MQTT SUBSCRIBE ERROR : Cannot subscribe`
      })}
  });
})

client.on("error", (error) => {
  useErrorLogger('MQTT').error({
    level: 'error',
    message: `CANNOT CONNECT MQTT`
  })
})

app.get('/api/get/query', (req, res) => {
  try {
    const table = req.query['table'];
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    connection.query(
      `SELECT ${selects} FROM iot.${table} ORDER BY id DESC LIMIT ${num};`,
      (err, rows) => {
        const jsonRows = nullToZeroFilter(rows);
        res.send(jsonRows);
      }
    )
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `SIMPLE QUERY ERROR : ${err}`
    })
  }
});

app.get('/api/get/switch', (req, res) => {
  try {
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    const machine = req.query['machine'];
    connection.query(
      `SELECT ${selects} FROM iot.SWITCH WHERE machine = \"${machine}\" ORDER BY id DESC LIMIT ${num};`,
      (err, rows) => {
        res.send(rows);
      }
    )
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SWITCH QUERY ERROR : ${err}`
    })
  }
});

app.get('/api/get/environment/history', (req, res) => {
  try{
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
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET ENV HISTORY QUERY ERROR : ${err}`
    })
  }
});

app.get('/api/get/switch/history', (req, res) => {
  try{
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    connection.query(
      `SELECT ${selects} FROM iot.SWITCH ORDER BY id DESC LIMIT ${num};`,
      (err, rows) => {
        res.send(rows)
      }
    )} catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SWITCH HISTORY QUERY ERROR : ${err}`
    })
  }
});


app.post('/api/post/switch/machine', (req, res) => {
  try {
    let sql = 'INSERT INTO iot.SWITCH VALUES (null, ?, ?, ?, now(), 0)';
    let machine = req.body.params['machine'];
    let status = req.body.params['status'];
    let name = req.body.params['name'];
    let params = [machine, status, name];

    connection.query(sql, params,
      (err, rows) => {
        res.send(rows);
        useInfoLogger('switch').info({
          level: 'info',
          message: `[${name}] ${status?"ON":"OFF"}`
        });
        console.log(`${machine} power has been changed through mqtt.`);
        client.publish(machine, status?'1':'0');
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SWITCH QUERY ERROR : ${err}`
    })
  }

});

app.post('/api/post/apply/settings', (req, res) => {
  try {
    const sql = 'INSERT INTO iot.SETTING ' +
      'VALUES (null, ?, ?, ?, now(), 0)';
    const category = req.body.params['category'];
    const [min, max] =req.body.params['setting']
    const params = [category, min, max]
    connection.query(sql, params, (err, rows) => { res.send(rows); }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SETTING QUERY ERROR : ${err}`
    })
  }

});

app.post('/api/post/signin', (req, res) => {
  try{
    const {username, password} = req.body.params;
    const sql = `SELECT name, pw FROM iot.users WHERE (name="${username}" AND pw="${password}") AND isDeleted=0;`
    const params = [username, password];
    connection.query(sql, params, (err, rows) => {
      console.log(rows);
      let login = JSON.parse(JSON.stringify(rows))[0];
      res.send(login);
    })
  } catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SIGN IN QUERY ERROR : ${err}`
    })
  }
})

 const checkEmpty = (value) => {
  if ( value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
    return true;
  }
}

 function getLocaleMoment(date) {
  return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss');
}

 function envHistoryReq2query(req_params){
  const [environment] = req_params['selects'];
  const sections = req_params['sections'];

  const sqls = sections.map((section) => {
    return `SELECT ${environment}, created
    FROM iot.ENV
    WHERE DATE_FORMAT(iot.ENV.created, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') 
    AND section = ${section}
    ORDER BY id DESC ;`;
  });

  return sqls.join(" ");
}

 function nullToZeroFilter(rows){
  const jsonRows = JSON.parse(JSON.stringify(rows))[0]
  for( let key in jsonRows ){
    if(jsonRows[key] === null){ jsonRows[key] = 0; }
    return jsonRows
  }
}
