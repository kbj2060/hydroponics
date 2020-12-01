'use strict'

//process.chdir('/home/server/hydroponics');

const SETTING_PATH = "../values/preferences";
const LOGGER_PATH = "./utils/useLogger";
const DB_CONF_PATH = "./server/db_conf.json";
//const BROKER_URL = 'mqtt://192.168.0.3';

const {useInfoLogger, useErrorLogger} = require(LOGGER_PATH);
const localhostMqttClientId = "MQTT";

const {socketIoPort:PORT, settingType, mqttURL:BROKER_URL} = require(SETTING_PATH),
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
    socket.broadcast.emit('receiveSwitchControl', switchStatus);
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
               VALUES (null, \"${machine}\", \"${section}\", ${current}, now(), 0);`
  connection.query(sql,(err, rows) => {
    if(err) {console.log(err);}
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
               VALUES (null, \"${section}\", ${_json['co2']}, ${_json['humidity']}, ${_json['temperature']}, now(), 0);`;
  connection.query(sql, (err, rows) => {
    if(err) {console.log(err);}
  	}
  )
}

/*
mqtt data send example
section 이 없기 때문에 각각 기계 켜고 끄기 불가능. 하나로 묶어서 켜고 끄기.
topic : switch/{machine}
data : '1' or '0'
 */
const handleSwitchesMQTT = (topic, message) => {
  const [_, machine] = topic.split("/");
  const status = JSON.parse(message.toString()) !== 0;
  console.log(machine, status);
  emitMqttSwitch(machine, status);
}

// emit 할 때는 status의 값은 불리언 값으로 해야한다.
// 숫자로 할 시 스위치 전환이 되지 않음.
const emitMqttSwitch = async (machine, status) => {
  console.log(machine, status)
  io.emit('receiveSwitchControl', {
    machine : machine,
    status : status
  })
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
/*
 * 기본 쿼리 구조 시작
 */
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

app.get('/api/get/query/last', (req, res) => {
  try {
    const selects = req.query['selects'].join(",");
    const whereColumn = req.query['whereColumn'];
    const where = req.query['where'];
    const table = req.query['table'];
    const sql = `SELECT ${selects} FROM iot.${table} 
                WHERE ${whereColumn} = \"${where}\"
                ORDER BY id DESC LIMIT 1;`
    connection.query(sql, (err, rows) => { res.send(rows); } )
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SWITCH QUERY ERROR : ${err}`
    })
  }
});
/*
 * 기본 쿼리 구조 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 섹션 시작
 */

app.get('/api/get/section', (req, res) => {
  try {
    const sql = `SELECT id, section_name FROM iot.section;`
    connection.query(sql, (err, rows) => {
      let result = {}
      rows.forEach((row, index) => {
        result[row.id] = row.section_name 
      })
      console.log({"sections" : result})
      res.send({"sections" : result})
    })
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SECTIONS QUERY ERROR : ${err}`
    })
  }
});


/*
 * 섹션 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 환경 설정 시작
 */
app.get('/api/get/environment/history', (req, res) => {
  try{
    const [environment] = req.query['selects'];
    const section = req.query['section'];

    const sql = `SELECT section, ${environment}, created
                FROM iot.env
                WHERE 
                  DATE_FORMAT(iot.env.created, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') 
                AND
                  section LIKE \"%${section}%\"
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

// Android
app.get('/api/get/environment/average', (req, res) => {
  try {
    const section = req.query['section'];
    const sql = `SELECT section, temperature, humidity, co2 FROM iot.env
                WHERE id 
                  in (SELECT max(id) FROM iot.env GROUP BY section )
                AND
                  section LIKE \"%${section}%\"
                ORDER BY id DESC;`
    connection.query(sql, (err, rows) => {
      let avgs = {'temperature' : 0, 'humidity' : 0, 'co2' : 0}
      let n_subsection = 0;
      rows.forEach((row, index) => {
        if(!row.section.includes(`${section}-`)){ return false } 
        else {
          avgs['temperature'] += row['temperature']
          avgs['humidity'] += row['humidity']
          avgs['co2'] += row['co2']
          n_subsection++
        }
      })
      avgs['temperature'] = parseInt( avgs['temperature'] / n_subsection)
      avgs['humidity'] = parseInt( avgs['humidity'] / n_subsection)
      avgs['co2'] = parseInt( avgs['co2'] / n_subsection)
      console.log(avgs);
      res.send(avgs);
    })
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SWITCH QUERY ERROR : ${err}`
    })
  }
});

/*
 * 환경 설정 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 스위치 설정 시작
 */
//Android
app.get('/api/get/switch/now', (req, res) => {
  try{
    const sql = `SELECT section, machine, status FROM iot.switch
                WHERE id in (SELECT max(id) FROM iot.switch GROUP BY section, machine)
                ORDER BY id DESC;`
    connection.query(sql, (err, rows) => {
        let results = {} 
        rows.forEach((row, index) => {
            if(row.section === null) { return }
            if(row.status === 1){ 
                if(!results.hasOwnProperty(`${row.section}`)){
                    results[`${row.section}`] = [row.machine];
                } else {
                    results[`${row.section}`].push(row.machine)
                } 
            }
        })
        console.log({"switches" : results});
        res.send({"switches" : results});
      }
    )} catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET CURRENT SWITCH HISTORY QUERY ERROR : ${err}`
    })
  }
})

app.get('/api/get/switch/history', (req, res) => {
  try{
    const selects = req.query['selects'].join(",");
    const num = req.query['num'];
    const section = req.query['section']
    const sql = `SELECT ${selects} FROM iot.switch WHERE section = \"${section}\" ORDER BY id DESC LIMIT ${num};`
    connection.query(sql, (err, rows) => {
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

app.post('/api/post/switch/machine', (req, res) => {
  try {
    let machine = req.body.params['machine'];
    let status = req.body.params['status'];
    let name = req.body.params['name'];
    let section = req.body.params['section'];
    let sql = `INSERT INTO iot.switch VALUES (null,\"${section}\",\"${machine}\", \"${status}\", \"${name}\", now(), 0)`;
	  console.log(sql);

    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('switch').info({
          level: 'info',
          message: `[${name}] ${machine} ${status?"ON":"OFF"}`
        });
        console.log(`${machine} power has been changed through mqtt.`);
        client.publish(`switch/${machine}`, String(status));
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SWITCH QUERY ERROR : ${err}`
    })
  }
});
/*
 * 스위치 설정 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 전류 설정 시작
 */
// GROUP BY 설정을 바꿔주어야 오류가 안남.
app.get('/api/get/current', (req, res) => {
  try{
    const selects = req.query['selects'].join(",");
    const machine = req.query['machine'];
    const section = req.query['section'];
    const sql = `SELECT 
                  ${selects} FROM iot.current
                WHERE 
                  id in (SELECT max(id) FROM iot.current WHERE machine = \"${machine}\" GROUP BY section )
                AND 
                  section LIKE \"%${section}%\"
                ORDER BY id desc;`
    connection.query( sql, (err, rows) => {
      let results = groupBy(rows, "section")
      Object.keys(results).forEach((key) => { results[key] = results[key][0]['current']; })
      console.log(results);
      res.send(results)
    })
  } catch(err){
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET CURRENT QUERY ERROR : ${err}`
    })
  }
});
/*
* 전류 설정 끝
* ---------------------------------------------------------------------------------------------------------------------
* 자동화 설정 시작
*/
/*app.get('/api/get/switch/auto', (req, res) => {
  try {
    const item = req.query['item'];
    const sql = `SELECT enable FROM iot.auto WHERE item = \"${item}\"  ORDER BY id DESC LIMIT 1;`;
    connection.query(sql, (err, rows) => { res.send(rows[0]) })
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET AUTO SWITCH QUERY ERROR : ${err}`
    })
  }
});*/

function union_all(selects, section, arr) {
  const sqls = arr.map((item, index) => {
    if(index === 0){ return `(SELECT ${selects} FROM iot.auto 
	    WHERE item = '${item}' AND section = \"${section}\" 
	    ORDER BY id DESC LIMIT 1)` }
    else { return `UNION ALL (SELECT ${selects} FROM iot.auto 
    		WHERE item = '${item}' AND section = \"${section}\" 
		ORDER BY id DESC LIMIT 1)` }
  })
  return sqls.join(' ')
}

app.get('/api/get/load/auto', (req,res) => {
  try{
    const selects = req.query['selects'].join(",");
    const auto = req.query['where'];
	  const section = req.query['section']
    const sql = union_all(selects,section, auto);
	  console.log(sql);
    connection.query(sql, (err, rows) => {
      let dic = {}
      rows.forEach((row) => {
	      console.log(row);
	      let values = JSON.parse(row['duration']);
        values['enable'] = row['enable'] === 1;
        dic[row['item']] = values;
      })
      res.send(dic)
    });
  }catch(err){
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST LOAD AUTO ERROR : ${err}`
    })
  }
})

// set global sql_mode=''; 로 엄격 모드를 풀어야 json 형식으로 들어감.
// JSON 을 넣을 시 \' \' 로 감싸주어야 함.
function classifyValues (section, controlSetting, user) {
  return Object.keys(controlSetting).map((key, index) => {
    const enable = controlSetting[key]['enable']
    const _type = settingType[section][key];
    delete controlSetting[key]['enable']
    return `(null,\"${section}\", \"${key}\", ${enable}, \"${_type}\", \"${user}\",\'${JSON.stringify(controlSetting[key])}\', now(), 0)`;
  })
}

app.post('/api/post/save/auto', (req,res) => {
  try{
    const { section, controlSetting, user } = req.body.params;
    const sqlValues = classifyValues(section, controlSetting, user).join(',');
    const sql =  `INSERT INTO iot.auto VALUES ${sqlValues};`;
    console.log(controlSetting, user)
    connection.query(sql, (err, rows) => {
        res.send(rows);
      }
    );
  }catch(err){
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SAVE AUTO ERROR : ${err}`
    })
  }
})
/*
 * 자동화 설정 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 로그인 설정 시작
 */
app.post('/api/post/signin', (req, res) => {
  try{
    const {username, password} = req.body.params;
    const sql = `SELECT name, pw FROM iot.user 
                 WHERE (name="${username}" AND pw="${password}") AND isDeleted=0;`
    const params = [username, password];
	  console.log(params);
    connection.query(sql, params, (err, rows) => {
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
/*
 * 로그인 설정 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 유틸 함수 시작
 */
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function getLocaleMoment(date) { return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss'); }

const cleanHistoryDict = (res, env) => {
  let dic = Object({})
  for (let [key, value] of Object.entries(res)) {
    value.forEach((v) => {
      const date = getLocaleMoment(v['created']);
      dic[date] = v[env]
    })
    res[key] = dic;
    dic = {};
  }
  return res
}
