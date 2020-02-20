import React from 'react';
import {Line} from 'react-chartjs-2';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56]
    }
  ]
}


export default function HistoryCard(props) {
  const { backgroundColor, ...rest } = props;
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
            }}
        />
      </div>
      <div className={classes.footer} >
        <h4>{props.subject}</h4>
        <p>문제가 발견되지 않았습니다.</p>
        <div className={classes.updateInfo}>
          <TimerIcon />
          <p className={classes.updateTime}> 방금 갱신됨</p>
        </div>
      </div>
    </div>
    );
  }
