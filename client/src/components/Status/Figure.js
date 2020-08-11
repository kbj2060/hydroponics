import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
const mqtt = require('mqtt');

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


  const client = mqtt.connect('mqtt://127.0.0.1',{clientId: "webClient"});

  useEffect(() => {
    client.on('message', (topic, message) => {
      console.log(topic, message.toString());
    })

    client.on('connect', (packet) => {
      client.subscribe(['Temperature_1', 'Humidity_1', 'CO2_1', 'Current_1'],  function (err) {
        if (!err) { client.publish('presence', 'Hello mqtt') }
      });
    })
    client.on("error", (error) => {
      console.log("Can't connect" + error);
    })
  })

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
