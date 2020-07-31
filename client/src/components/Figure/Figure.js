import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0)',
    borderRadius: '50%',
    border: '3px solid #FFCB3A',
    height: props => props.dimensions.width / props.n_measurements,
    margin: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center'
  },
  title : {
    padding : '5px 0 5px 0',
    color : 'white',
    fontWeight : 'bold'
  },
  environmentValues: {
    padding : '5px 0 5px 0',
    color : 'white',
    textAlign : 'center',
    fontSize : '0.8rem',
    fontWeight : 'bold',
  }
});

export default function Figure(props) {
  const { measurement, dimensions, values } = props;
  const n_measurements = 3
  const classes = useStyles({
    dimensions: dimensions,
    n_measurements : n_measurements
  });
  const unitsTable = {
    'humidity': '%',
    'co2': 'ppm',
    'temperature': '°C'
  }
  const measurementWordTable = {
    'humidity' : 'HUM',
    'temperature': 'TEMP',
    'co2': 'CO2'
  }

  return (
      <div >
          <Typography className={classes.title}>{measurementWordTable[measurement]}</Typography>
          <Paper className={classes.root}>
            <div>
              <span className={classes.environmentValues}>{values}{unitsTable[measurement]}</span>
            </div>
          </Paper>
      </div>
  );
}
