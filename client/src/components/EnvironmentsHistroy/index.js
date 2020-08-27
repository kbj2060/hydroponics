import React, {useCallback, useEffect} from 'react';
import CustomLine from './CustomLine';
import useStyles from '../../assets/jss/HistoryStyle';
import TimerIcon from '../../assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {checkEmpty} from "../utils/CheckEmpty";

export default function Index(props) {
  const { WordsTable, plants } = require('root/init_setting');
  const { environment } = props;
  const classes = useStyles();
  const [history, setHistory] = React.useState([]);
  const [lastUpdate, setLastUpdate] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true)


  const getLastUpdatedTime = (data) => {
    return Object.keys(data[plants[0]])[0];
  }
  // json 형태로 반환 받아 사용
  //  {
  //    '1': {
  //      '2020/08/27 03:20:49': 1212,
  //     '2020/08/27 03:20:42': 1212,
  //      '2020/08/27 03:20:28': 1212
  //    },
  //    '2': { '2020/08/27 03:22:55': 1212 },
  //    '3': { '2020/08/27 03:23:07': 1212 }
  //  }
  const fetchHistory = useCallback(async () => {
    await axios.get('/api/get/environment/history', {
      params: {
        selects: [environment],
      }
    }).then(({data})=> {
      setHistory(data);
      setLastUpdate(getLastUpdatedTime(data));
      setIsLoading(false);
    }).catch((err) => {
      console.log("HISTORY FETCH ERROR!");
      console.log(err);
    })
  }, [environment])

  useEffect(() => {
    const {historyUpdateTime} = require('root/init_setting');
    fetchHistory();
    const interval = setInterval(() => {
      fetchHistory();
    }, historyUpdateTime);
    return () => {
      clearInterval(interval)
    };
  }, [fetchHistory]);

  return (
    !isLoading ? <div className={classes.foreground}>
        <CustomLine environment={environment} history={history} width={5} height={2} />
        <Typography className={classes.title}> {WordsTable[environment]} </Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> 마지막 업데이트 : {lastUpdate}</Typography>
        </div>
      </div>: <></>
    )
  }
