import React from 'react';
import {Line} from 'react-chartjs-2';
import useStyles from 'assets/jss/HistoryStyle';
import TimerIcon from 'assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import { FIGURE_FEED } from 'resolvers/resolvers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

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
        backgroundColor: '#ffcd12',
        borderColor: '#ffcd12',
        borderWidth: 1,
        data: []
      }
    ]
  }
 
  console.log(state)
  return (
    <div className={classes.background}>
      <div className={classes.foreground}>
      <Query query={FIGURE_FEED} fetchPolicy={'cache-and-network'} variables={{
              orderBy: "updatedAt_ASC",
              filter : measurement,
              last: 60,
            }}>
            {({ loading, error, data }) => {
                if (loading) return <ColorCircularProgress size={40} thickness={4} />;
                if (error) return `Error! ${error}`;
                try {
                  data.figureFeed.figures.forEach((currentValue, index) => {
                    state.datasets[0].data.push(currentValue.value);
                    state.labels.push(index);
                  })
                } catch (error) {
                  console.log(error)
                }
                return (
                  <Line
                    className={classes.chart}
                    data={state}
                    options={{
                      responsive : true,
                      maintainAspectRatio : false,
                      color : 'white',
                      scales: {
                        xAxes: [{
                          gridLines: {color: "white"},
                          ticks: {fontColor: 'white'}
                        }],
                        yAxes: [{
                          gridLines: { color: "white"},
                          ticks: {fontColor: 'white'}
                        }]
                      },
                      }}
                  />)
            }}
          </Query>         
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
