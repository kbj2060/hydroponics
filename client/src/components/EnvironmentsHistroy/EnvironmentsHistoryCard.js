import React, {useEffect} from 'react';
import CustomLine from './CustomLine';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const checkEmpty = (value) => {
  if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
    return true;
  }
}

const getLastUpdateData = (history) => {
  if (checkEmpty(history)){ return ''; }
  return Object.keys(history[0])[0]
}

export default function EnvironmentsHistoryCard(props) {
  const { historyUpdateTime, environmentsWordTable } = require('../../PROPERTIES');
  const { environment } = props;
  const classes = useStyles();
  const [history, setHistory] = React.useState([]);
  const [lastUpdate, setLastUpdate] = React.useState('');


  const fetchHistory = async () => {
    try {
      await axios.get('/api/getEnvironmentHistory', {
        params: {
          selects: [environment, 'created'],
          table: ['plant1', 'plant2', 'plant3']
        }
      }).then(({data:environmentFromPlant})=> {
        console.log(environmentFromPlant)
        const lastUpdateData = getLastUpdateData(environmentFromPlant)
        setHistory(environmentFromPlant);
        setLastUpdate(lastUpdateData);
      });
    } catch (e) {
      console.log('FETCH HISTORY ERROR.');
    }
  }

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(() => {
      fetchHistory()
    }, historyUpdateTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <CustomLine environment={environment} history={history} width={3} height={1} />
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{environmentsWordTable[environment]}</Typography>
        <Typography variant="body2" className={classes.textColor}>No problem found</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> Last Update : {lastUpdate}</Typography>
        </div>
      </div>
    </div>
    );
  }
