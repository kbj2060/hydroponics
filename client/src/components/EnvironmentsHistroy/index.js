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

  const fetchHistory = useCallback(async () => {
    const getLastUpdateData = (history) => {
      if (checkEmpty(history)){ return ''; }
      return Object.keys(history[0])[0]
    }

    const setLastUpdateFromFiltered = (environmentFromPlant) => {
      const lastUpdateData = getLastUpdateData(environmentFromPlant)
      setLastUpdate(lastUpdateData);
    }

    await axios.get('/api/get/environment/history', {
      params: {
        selects: [environment, 'created'],
        sections: plants
      }
    }).then(({data})=> {
      setHistory(data);
      setLastUpdateFromFiltered(data);
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
      <div className={classes.foreground}>
        <CustomLine environment={environment} history={history} width={5} height={2} />
        <Typography className={classes.title}> {WordsTable[environment]} </Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> 마지막 업데이트 : {lastUpdate}</Typography>
        </div>
      </div>

    );
  }