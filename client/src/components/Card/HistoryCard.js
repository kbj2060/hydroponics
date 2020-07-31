import React from 'react';
import {Line} from 'react-chartjs-2';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const ColorCircularProgress = withStyles({
  root: {
    color: 'white',
  },
})(CircularProgress);

export default function HistoryCard(props) {
  const { measurement } = props;
  const classes = useStyles();
  const state = {
    labels: [],
    datasets: [
      {
        label: measurement,
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#efcf76',
        borderColor: '#FFCB3A',
        borderWidth: 1,
        data: []
      }
    ]
  }

    /* 기록하는 앞부분 데이터 끌고 와서 표시 */
  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
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
