'use strict'
/*
  백엔드, 소켓, MQTT
 */

const LOGGER_PATH = "./utils/useLogger";
const SETTING_PATH = "../values/preferences";
const STRING_PATH = "../values/strings";

const {MQTT_BROKER, settingType, machines} = require(SETTING_PATH)
const {useInfoLogger, useErrorLogger} = require(LOGGER_PATH);
const {WordsTable} = require(STRING_PATH)
const {connection, pool} = require('./dbHandler');
const {TelegramWrapper} = require('./telegramWrapper');

const http = require("http")
const mqtt = require('mqtt')
const moment = require('moment')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require("path");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect()

/* 연결 끊김 방지 */
pool.query('select 1 + 1', (err, rows) => { /* */ });

/*
 * 기본 쿼리 구조 시작
 */
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
// Android
app.get('/api/get/section', (req, res) => {
  try {
    const sql = `SELECT id, section_name FROM iot.section;`
    connection.query(sql, (err, rows) => {
      let result = {}
      rows.forEach((row) => {
        result[row.id] = row["section_name"]
      })
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

const convertFixedFloat = (x) => {
  return Number.parseFloat(x).toFixed(1);
}

app.get('/api/get/environment/latter', (req, res) => {
  try{
    const section = req.query['section']
    const sql = `SELECT co2, humidity, temperature FROM iot.env 
                WHERE section = \"${section}\"
                ORDER BY id DESC LIMIT 1;`
    connection.query(sql, (err, rows) => {
      if(rows.length === 1){
        const status = rows[0]
        for (const [key, value] of Object.entries(status)) {
          status[key] = convertFixedFloat(parseFloat(value));
        }
        res.send(status); 
      } else {
        res.send({'co2':0, 'humdity':0, 'temperature':0})
      }
    })
  } catch (err) {
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET ENV LATTER QUERY ERROR : ${err}`
    })
  }
});


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
      rows.forEach((row) => {
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

const createDefaultData = (status, machine, created, controlledBy) => {
  return {	status: status,
            machine: machine,
            created: created,
            controlledBy :controlledBy }
}

app.get('/api/get/switch/now', (req, res) => {
  try{
    const section = req.query['section'];
    const sql = `SELECT section, machine, status FROM iot.switch
                WHERE id in (SELECT max(id) FROM iot.switch WHERE section = \"${section}\" 
                GROUP BY section, machine)
                ORDER BY id DESC;`
    connection.query(sql, (err, rows) => {
        let results = {}
        rows.forEach((row) => {
          if(row.section === null) { return }
          if(row.status === 1){
            if(!results.hasOwnProperty(`${row.section}`)){
              results[`${row.section}`] = [row.machine];
            } else {
              results[`${row.section}`].push(row.machine)
            }
          }
        })
        res.send(results);
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
        const result = rows.map((row) => {
            const localMomentCreated = getLocaleMoment(row.created)
						return createDefaultData(row.status, row.machine, localMomentCreated, row.controlledBy)
				});
        res.send(result);
      })   
  } catch (err) {
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
    new TelegramWrapper().post_text(`${name}(이)가 ${WordsTable[section]}의 ${WordsTable[machine]}을 ${status?"켰":"껐"}습니다.`);

    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('switch').info({
          level: 'info',
          message: `[${name}] ${machine} ${status?"ON":"OFF"}`
        });
        console.log(`${machine} power has been changed.`);
        client.publish(`switch/${machine}`, String(status));
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SWITCH QUERY ERROR : ${err}`
    })
  }
});

app.post('/api/post/switch/reset', (req, res) => {
  try {
    let name = req.body.params['name'];
    let section = req.body.params['section'];
    const status = 0;
    const values = machines[section].map((machine, idx) => {
      return idx === machines.length - 1
      ? `(null,\"${section}\",\"${machine}\", \"${status}\", \"${name}\", now(), 0);`
      : `(null,\"${section}\",\"${machine}\", \"${status}\", \"${name}\", now(), 0)`
    })
    let sql = `INSERT INTO iot.switch VALUES ` + values.join(',');
    new TelegramWrapper().post_text(`${name}(이)가 ${WordsTable[section]}의 모든 전원을 차단했습니다.`);

    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('switch').info({
          level: 'info',
          message: `[${name}] ${machines[section]} ${status?"ON":"OFF"}`
        });
        console.log(`${machines[section]} power has been changed.`);
        machines[section].forEach((machine) => {
          client.publish(`switch/${machine}`, String(status));
        })
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
      Object.keys(results).forEach((key) => { 
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
/*
* 전류 설정 끝
* ---------------------------------------------------------------------------------------------------------------------
* 자동화 설정 시작
*/
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

app.get('/api/get/auto', (req,res) => {
  try{
    const selects = req.query['selects'].join(",");
    const auto = req.query['where'];
    const section = req.query['section']
    const sql = union_all(selects,section, auto);
    connection.query(sql, (err, rows) => {
      let dic = {}
      rows.forEach((row) => {
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
  return Object.keys(controlSetting).map((key) => {
    const enable = controlSetting[key]['enable']
    const _type = settingType[section][key];
    delete controlSetting[key]['enable']
    return `(null,\"${section}\", \"${key}\", ${enable}, \"${_type}\", \"${user}\",\'${JSON.stringify(controlSetting[key])}\', now(), 0)`;
  })
}

app.post('/api/post/auto', (req,res) => {
  try{
    const { section, auto, user } = req.body.params;
    const sqlValues = classifyValues(section, auto, user).join(',');
    const sql =  `INSERT INTO iot.auto VALUES ${sqlValues};`;
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
 * 일정 설정 시작
 */
  const date2moment = (date) => {
    const json = typeof(date) === "string" ? JSON.parse(date): date;
    const nDate = new Date(json.year, json.month-1, json.day)
    return moment(nDate).format('YYYY-MM-DD')
  }

  const string2moment = (date) => {
    const nDate = new Date(date);
    return moment(nDate).format('YYYY-MM-DD')
  }

  const getScheduleSql = (date, isMonth) => {
    const format = isMonth === 'false'?'YYYY-MM-DD':'YYYY-MM';
    const mDate = `%${moment(new Date(date)).format(format)}%`
    return `select id, date, title, content, binding from iot.schedule where date LIKE \"${mDate}\" order by date desc;`
  }

app.get('/api/get/schedules', (req,res) => {
  try{
    const {date, month:isMonth} = req.query
    const sql = getScheduleSql(date, isMonth);
    connection.query(sql, (err, rows) => {
      if(checkEmpty(rows)){
        res.send([])
      } else {
        rows.forEach((row) => { row.date = row.date.split(',') })
        res.send(rows)
      }
    });
  }catch(err){
    useErrorLogger('GET').error({
      level: 'error',
      message: `GET SCHEDULE ERROR : ${err}`
    })
  }
})

app.post('/api/post/remove/schedule', (req, res) => {
  try {
    let {ids} = req.body.params;
    let sql = `DELETE FROM iot.schedule WHERE id in (${ids.join(",")})`;
    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('schedule').info({
          level: 'info',
          message: `[${ids}] 일정 제거`
        });
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST REMOVE SCHEDULE ERROR : ${err}`
    })
  }
});

app.post('/api/post/revise/schedules', (req, res) => {
  try {
    let {id, dates, title, content} = req.body.params;
    const mDate = dates.map((date) => date2moment(date))
    let sql = `UPDATE iot.schedule SET date = \"${mDate}\", title = \"${title}\", content = \"${content}\", binding = \"${mDate.length}\" WHERE id = \"${id}\";`
    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('schedule').info({
          level: 'info',
          message: `[${id}] 일정 수정`
        });
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST REVISE SCHEDULE ERROR : ${err}`
    })
  }
});

app.post('/api/post/schedules', (req, res) => {
  try {
    let {dates, title, content, binding} = req.body.params;
    let dateList = dates.map((date) => string2moment(date))
    let sql = `INSERT INTO iot.schedule VALUES (null, \"${dateList}\", \"${title}\", \"${content}\", ${binding}, now(), 0);`;
    connection.query(sql, (err, rows) => {
        res.send(rows);
        useInfoLogger('schedule').info({
          level: 'info',
          message: `[${dates}] 일정 추가`
        });
      }
    )} catch (err) {
    useErrorLogger('POST').error({
      level: 'error',
      message: `POST SCHEDULE ERROR : ${err}`
    })
  }
});
/*
 * 일정 설정 끝
 * ---------------------------------------------------------------------------------------------------------------------
 * 로그인 설정 시작
 */

app.post('/api/post/signin', (req, res) => {
  try{
    const {username, password} = req.body.params;
    const sql = `SELECT name, pw FROM iot.user 
                 WHERE (name="${username}" AND pw="${password}") AND isDeleted=0;`
    const params = [username, password];
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

const checkEmpty = (value) => {
    if ( value === [] || value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
        return true;
    }
}
/*
* 유틸함수 끝
*/


const server = http.createServer(app).listen(9000, function () {
  console.info("Listening for HTTP on", this.address());
});

/*
  socketio 통신
 */
const io = require('socket.io').listen(server)

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

/*
  MQTT 통신
*/
const client = mqtt.connect(`mqtt://${MQTT_BROKER}`,{port: 1883, clientId: "MQTT"});

/*
mqtt data send example
topic : current/{machine}/{section}
data : 2.3
 */
const handleCurrentsMQTT = (topic, message) => {
  const current = JSON.parse(message.toString());
  const [table, machine, section] = topic.split("/");
  const sql = `INSERT INTO iot.${table} VALUES (null, \"${machine}\", \"${section}\", ${current}, now(), 0);`
  connection.query(sql,(err) => {
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
  connection.query(sql, (err) => {
      if(err) {console.log(err);}
    }
  )
}
// emit 할 때는 status의 값은 불리언 값으로 해야한다.
// 숫자로 할 시 스위치 전환이 되지 않음.
const emitMqttSwitch = async (machine, status) => {
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
  const status = JSON.parse(message.toString()) !== 0;
  emitMqttSwitch(machine, status);
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
