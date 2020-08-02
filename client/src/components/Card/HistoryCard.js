import React, {useEffect} from 'react';
import CustomLine from '../Line/CustomLine';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const INTERVAL_TIME = 3000;

export default function HistoryCard(props) {
  const { measurement } = props;
  const classes = useStyles();
  const [environments, setEnvironments] = React.useState([]);

  const fetchHistory = async () => {
    try {
      let {data:environmentFromPlant} = await axios.get('/api/environmentFromPlant', {
        params: {
          measurement: measurement,
          plants: ['plant1', 'plant2', 'plant3']
        }
      });
      setEnvironments(environmentFromPlant);
    } catch (e) {
      console.log('FETCH HISTORY ERROR.');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHistory();
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

    /* 기록하는 앞부분 데이터 끌고 와서 표시 */
  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <CustomLine values={environments} width={3} height={1}/>
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{measurement}</Typography>
        <Typography variant="body2" className={classes.textColor}>No problem found</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}>Just Updated</Typography>
        </div>
      </div>
    </div>
    );
  }
