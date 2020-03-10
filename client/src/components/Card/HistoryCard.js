import React from 'react';
import {Line} from 'react-chartjs-2';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#D7A310',
      borderColor: '#D7A310',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function HistoryCard(props) {
  const { backgroundColor } = props;
  const classes = useStyles({backgroundColor});

  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
        <Line
          className={classes.chart}
          data={state}
          options={{
            title:{
            },
            legend: {
              display: false
            },
            responsive : true,
            maintainAspectRatio : false,
            color : '#405C5A',
            scales: {
              xAxes: [{
                gridLines: {color: "#405C5A"},
                ticks: {fontColor: '#405C5A'}
              }],
              yAxes: [{
                gridLines: { color: "#405C5A"},
                ticks: {fontColor: '#405C5A'}
              }]
            }}}
        />
      </div>
      <div className={classes.footer} >
        <Typography variant="body1" className={classes.textColor}>{props.subject}</Typography>
        <Typography variant="body2" className={classes.textColor}>문제가 발견되지 않았습니다.</Typography>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}>방금 갱신됨</Typography>
        </div>
      </div>
    </div>
    );
  }
