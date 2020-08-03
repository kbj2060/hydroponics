import React, {useEffect} from 'react';
import CustomLine from '../Line/CustomLine';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


export default function HistoryCard(props) {
  const { historyUpdateTime } = require('../../properties');
  const { environment } = props;
  const classes = useStyles();
  const [history, setHistory] = React.useState([]);
  const [date, setDate] = React.useState([]);

  const fetchHistory = async () => {
    try {
      let {data:environmentFromPlant} = await axios.get('/api/getHistory', {
        params: {
          selects: environment,
          table: ['plant1', 'plant2', 'plant3']
        }
      });
      setHistory(environmentFromPlant);
    } catch (e) {
      console.log('FETCH HISTORY ERROR.');
    }
  }

  const fetchDates = async () => {
    try {
      let {data} = await axios.get('/api/getDate', {
        params: {
          table: 'plant1',
          num: 100
        }
      });
      setDate(data);
    } catch (e) {
      console.log('FETCH HISTORY ERROR.');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHistory();
      fetchDates();
    }, historyUpdateTime);
    return () => clearInterval(interval);
  }, []);

  console.log(date);

  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <CustomLine history={history} date={date} width={4} height={1} />
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{environment}</Typography>
        <Typography variant="body2" className={classes.textColor}>No problem found</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> Last Update : {date[date.length-1]}</Typography>
        </div>
      </div>
    </div>
    );
  }
