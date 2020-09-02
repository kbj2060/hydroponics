'use strict'

const INIT_SETTING_PATH = "../init_setting";
const LOGGER_PATH = "./utils/useLogger";
const DB_CONF_PATH = "./server/db_conf.json";
const BROKER_URL = 'mqtt://127.0.0.1';

const localhostMqttClientId = "MQTT";
const AutomationHost = "192.168.0.2";

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
const {checkEmpty} = require('./utils/CheckEmpty');

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

const client = mqtt.connect(BROKER_URL,{port: 1883, clientId: localhostMqttClientId});
/*
mqtt data send example
topic : current/{machine}/{section}
data : 2.3
 */
const handleCurrentsMQTT = (topic, message) => {
  const current = JSON.parse(message.toString());
  const [table, machine, section] = topic.split("/");
  const sql = `INSERT INTO iot.${table} 
               VALUES (null, \"${machine}\", ${section}, ${current}, now(), 0);`
  connection.query(sql,
    (err, rows) => {
      console.log(rows);
    }
  )
}

/*
mqtt data send example
topic : env/plant/{section}
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

// emit 할 때는 status의 값은 불리언 값으로 해야한다.
// 숫자로 할 시 스위치 전환이 되지 않음.
const emitSwitch = async (machine, status) => {
  io.emit('receiveSwitchControl', {
    machine : machine,
    status : status
  })
}

/*
mqtt data send example
section 이 없기 때문에 각각 기계 켜고 끄기 불가능. 하나로 묶어서 켜고 끄기.
topic : switch/{machine}
data : '1' or '0'
 */
const handleSwitchesMQTT = (topic, message) => {
  const [_, machine] = topic.split("/");
  // !== 로 고치지 말 것.
  const status = JSON.parse(message.toString()) != 0;
  console.log(machine, status );
  emitSwitch(machine, status);
}

client.on('message', (topic, message) => {
  try{
    if(topic.includes("env")){
      handlePlantEnvironmentsMQTT(topic, message);
    } else if (topic.includes("current")){
      handleCurrentsMQTT(topic, message);
    } else if (topic.includes("switch")){
      handleSwitchesMQTT(topic, message);
    }
  } catch (err){
    useErrorLogger('MQTT').error({
      level: 'error',
      message: `MQTT PUBLISH ERROR : ${err}`
    })
  }
})

client.on('connect', () => {
  client.subscribe(['switch/#','env/#', 'current/#'],  function (err) {
    if(err){
      useErrorLogger('MQTT').error({
        level: 'error',
        message: `MQTT SUBSCRIBE ERROR : Cannot subscribe`
      })}
  });
})

client.on("error", () => {
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
        res.send(rows);
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
      `SELECT ${selects} FROM iot.switch WHERE machine = \"${machine}\" ORDER BY id DESC LIMIT ${num};`,
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

app.get('/api/get/status', (req, res) => {
  try {
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    const section = req.query['section'];
    const sql = `SELECT ${selects} FROM iot.env 
                WHERE section = \"${section}\" 
                ORDER BY id DESC LIMIT ${num};`
    connection.query(sql, (err, rows) => {
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

app.get('/api/get/lineLimit', (req, res) => {
  try {
    const selects = req.query['selects'].join(",");
    const environment = req.query['environment'];
    const num = req.query['num'];
    const sql = `SELECT ${selects} FROM iot.setting 
                WHERE category = \"${environment}\" 
                ORDER BY id DESC LIMIT ${num};`
    connection.query(sql, (err, rows) => {
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
    const sql = `SELECT section, ${environment}, created
                FROM iot.env
                WHERE DATE_FORMAT(iot.env.created, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') 
                ORDER BY id DESC ;`;
    connection.query(
      sql, (err, rows) => {
        let results = JSON.parse(JSON.stringify(rows));
        results = groupBy(results, 'section');
        results = cleanHistoryDict(results, environment);
        res.send(results);
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
      `SELECT ${selects} FROM iot.switch ORDER BY id DESC LIMIT ${num};`,
      (err, rows) => {
        rows.forEach((row) => {
          row['created'] = getLocaleMoment(row['created'])
        })
        res.send(rows);
      }
    )} catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SWITCH HISTORY QUERY ERROR : ${err}`
    })
  }
});

app.get('/api/get/settings', (req, res) => {
  try{
    const selects = req.query['selects'].join(",");
    const settingKeys = req.query['settingKeys'];
    const num = req.query['num'];
    const queries = settingKeys.map((settingKey) => {
      return `SELECT ${selects} FROM iot.setting 
                 WHERE category = \"${settingKey}\" 
                 ORDER BY id DESC LIMIT ${num}`
    })
    connection.query( queries.join('; '), (err, rows) => {
      let _json = {}
      const result = rows.map((row) => {
        const key = row[0]['category']
        const type = row[0]['type']
        let values = []
        if(type === 'cycle'){ values = [row[0]['max']] }
        else if(type === 'range'){ values = [row[0]['min'], row[0]['max']] }
        return {[key] : values}
      })
      result.map((r) => {
        _json = Object.assign(_json, r);
      })
      res.send(_json)
    })
  } catch(err){
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SETTINGBAR QUERY ERROR : ${err}`
    })
  }
});

// GROUP BY 설정을 바꿔주어야 오류가 안남.
app.get('/api/get/current', (req, res) => {
  try{
    const selects = req.query['selects'].join(",");
    const machine = req.query['machine'];
    const sql = `SELECT ${selects} FROM iot.current
                WHERE id 
                in (SELECT max(id)
                  FROM iot.current
                  WHERE machine = \"${machine}\"
                  GROUP BY section )
                ORDER BY id desc;`
    connection.query( sql, (err, rows) => {
      let results = groupBy(rows, "section")
      Object.keys(results).map((key) => {
        results[key] = results[key][0]['current'];
      })
      res.send(results)
    })
  } catch(err){
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET CURRENT QUERY ERROR : ${err}`
    })
  }
});

app.get('/api/get/switch/auto', (req, res) => {
  try {
    const item = req.query['item'];
    const sql = `SELECT status FROM iot.auto WHERE item = \"${item}\"  ORDER BY id DESC LIMIT 1;`;
    connection.query(sql, (err, rows) => {
      res.send(rows[0])
    })
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET AUTO SWITCH QUERY ERROR : ${err}`
    })
  }
});

app.post('/api/post/switch/auto', (req, res) => {
  try {
    const { setting, status, name } = req.body.params;
    const sql =  `INSERT INTO iot.auto VALUES (null,  ${status}, \"${setting}\", \"${name}\", now(), 0);`;
    connection.query(sql, (err, rows) => {
      res.send(rows);
    })
  } catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST AUTO SWITCH QUERY ERROR : ${err}`
    })
  }
})

app.post('/api/post/switch/machine', (req, res) => {
  try {
    let sql = 'INSERT INTO iot.switch VALUES (null, ?, ?, ?, now(), 0)';
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
        client.publish(`switch/${machine}`, String(status?1:0));
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
    const {settingType} = require('../init_setting');
    const settings = req.body.params['settings'];
    let queries = Object.entries(settings).map(([key,values])=> {
      return getSqlBySettingType(key, values, settingType[key]);
    })
    console.log(queries.join('; '))
    connection.query(queries.join('; '), (err, rows) => {
      console.log(rows)
      res.send(rows);
    })} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SETTING QUERY ERROR : ${err}`
    })
  }
});


app.post('/api/post/signin', (req, res) => {
  try{
    const {username, password} = req.body.params;
    const sql = `SELECT name, pw FROM iot.user 
                 WHERE (name="${username}" AND pw="${password}") AND isDeleted=0;`
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

const getSqlBySettingType = (key, values, type) => {
  let sql = ``;
  let min=0, max=0;
  if(type === 'cycle'){
    [max] = values;
    sql = `INSERT INTO iot.setting VALUES (null, \"${key}\", 0, ${max}, \"${type}\", now(), 0)`;
  }
  else if (type === 'range'){
    [min, max] = values;
    sql = `INSERT INTO iot.setting VALUES (null, \"${key}\", ${min}, ${max}, \"${type}\", now(), 0)`;
  }
  return sql
}

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function getLocaleMoment(date) {
  return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss');
}

const cleanHistoryDict = (res, env) => {
  let dic = Object({})
  for (let [key, value] of Object.entries(res)) {
    value.map((v) => {
      const date = getLocaleMoment(v['created']);
      dic[date] = v[env]
    })
    res[key] = dic;
    dic = {};
  }
  return res
}

