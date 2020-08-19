export const checkEmpty = (value) => {
  if ( value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
    return true;
  }
}

export function getLocaleMoment(date) {
  return moment.utc(date).local().format('YYYY/MM/DD HH:mm:ss');
}

export function envHistoryReq2query(req_params){
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

export function nullToZeroFilter(rows){
  const jsonRows = JSON.parse(JSON.stringify(rows))[0]
  for( let key in jsonRows ){
    if(jsonRows[key] === null){
      jsonRows[key] = 0;
    }
    return jsonRows
  }
}
