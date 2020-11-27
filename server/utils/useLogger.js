const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, label, prettyPrint } = format;
const logDir = './.logs';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const timezone = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function useInfoLogger(topic){
  return createLogger({
    format: combine(
      label({label: `${topic}`}),
      timestamp({ format: timezone }),
      prettyPrint()
    ),
    transports: [
      // error 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.log`,
        maxFiles: 30,  // 30일치 로그 파일 저장
        zippedArchive: true,
      }),
    ]})
}

function useErrorLogger(topic){
  return createLogger({
    format: combine(
      label({label: `${topic}`}),
      timestamp({ format: timezone }),
      prettyPrint()
    ),
    transports: [
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
    ]})
}

exports.useErrorLogger = useErrorLogger
exports.useInfoLogger = useInfoLogger

/*logger.log({
  level: 'info',
  message: 'What time is the testing at?'
});*/
