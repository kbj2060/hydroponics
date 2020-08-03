import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0)',
    borderRadius: '50%',
    border: props => '3px solid ' + props.plantColor,
    height: props => props.dimensions.width / props.n_environment,
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

const circleColorTable = {
  'plant1' : "#FF925D",
  'plant2' : "#FFCB3A",
  'plant3' : "#FF4F61"
}
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

export default function Figure(props) {
  const { environment, dimensions, values, plant } = props;
  const { environments } = require('../../properties');
  const n_environment = environments.length;
  const classes = useStyles({
    dimensions: dimensions,
    n_environment : n_environment,
    plantColor : circleColorTable[plant],
  });


  return (
      <div >
          <Typography className={classes.title}>{measurementWordTable[environment]}</Typography>
          <Paper className={classes.root}>
            <div>
              <span className={classes.environmentValues}>{values}{unitsTable[environment]}</span>
            </div>
          </Paper>
      </div>
  );
}
