import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0)',
    borderRadius: '50%',
    border: props => '3px solid ' + props.plantColor,
    height: props => props.dimensions.width / (props.n_environment + 1),
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
    fontSize : '1rem',
    fontWeight : 'bold',
  }
});

export default function Figure(props) {
  const { environment, dimensions, values, plant } = props;
  const { environments, circleColorTable, unitsTable, environmentsWordTable } = require('../../PROPERTIES');
  const n_environment = environments.length;
  const classes = useStyles({
    dimensions: dimensions,
    n_environment : n_environment,
    plantColor : circleColorTable[plant],
  });

  return (
      <div >
          <Typography className={classes.title}>{environmentsWordTable[environment]}</Typography>
          <Paper className={classes.root}>
            <div>
              <span className={classes.environmentValues}>{values}{unitsTable[environment]}</span>
            </div>
          </Paper>
      </div>
  );
}
