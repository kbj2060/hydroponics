import React, {useEffect} from 'react';
import CustomLine from './CustomLine';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


export default function EnvironmentsHistoryCard(props) {
  const { historyUpdateTime } = require('../../PROPERTIES');
  const { environment } = props;
  const classes = useStyles();
  const [history, setHistory] = React.useState([]);
  const [lastUpdate, setLastUpdate] = React.useState('');

  const checkEmpty = (value) => {
    if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
      return true;
    }
  }

  const getLastUpdate = (history) => {
    if (checkEmpty(history)){ return ''; }
    else{ return Object.keys(history[0])[0]; }
  }

  const fetchHistory = async () => {
    try {
      let {data:environmentFromPlant} = await axios.get('/api/getEnvironmentHistory', {
        params: {
          selects: [environment, 'created'],
          table: ['plant1', 'plant2', 'plant3']
        }
      });
      setHistory(environmentFromPlant);
      setLastUpdate(getLastUpdate(history));
    } catch (e) {
      console.log('FETCH HISTORY ERROR.');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHistory();
    }, historyUpdateTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <CustomLine history={history} width={3} height={1} />
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{environment}</Typography>
        <Typography variant="body2" className={classes.textColor}>No problem found</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> Last Update : {lastUpdate}</Typography>
        </div>
      </div>
    </div>
    );
  }
