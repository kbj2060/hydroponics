import React, {useCallback, useEffect} from 'react';
import CustomLine from './CustomLine';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {checkEmpty} from "../utils";

export default function Index(props) {
  const { WordsTable } = require('../../client_property');
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

    await axios.get('/api/getEnvironmentHistory', {
      params: {
        selects: [environment, 'created'],
        table: ['plant1', 'plant2', 'plant3']
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
    const {historyUpdateTime} = require('../../client_property');
    fetchHistory();
    const interval = setInterval(() => {
      fetchHistory();
    }, historyUpdateTime);

    return () => {
      clearInterval(interval)
    };
  }, [fetchHistory]);

  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <CustomLine environment={environment} history={history} width={3} height={1} />
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{WordsTable[environment]}</Typography>
        <Typography variant="body2" className={classes.textColor}>문제 감지 : 0</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> 마지막 업데이트 : {lastUpdate}</Typography>
        </div>
      </div>
    </div>
    );
  }
