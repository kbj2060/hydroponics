import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import Figure from "./Figure";
import axios from "axios";



export default function StatusCard(props) {
  const {statusUpdateTime, environments} = require('../../PROPERTIES');
  const {plant} = props;
  const classes = useStyles();
  const {circleColorTable} = require('../../PROPERTIES');
  const [recentStatus, setRecentStatus] = useState({
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  });

  function statusReset() {
    setRecentStatus({
      "humidity": 0,
      "co2": 0,
      "temperature": 0
    })
  }
  const fetchStatus = async () => {
    try {
      const { data: status } = await axios.get('/api/getStatus', {
        params: {
          table: plant,
          selects: environments,
          num: 1
        }
      });
      setRecentStatus(status);
    } catch (e) {
      console.log('FETCH STATUS ERROR.');
      statusReset();
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      fetchStatus();
    }, statusUpdateTime);
    return () => clearInterval(interval);
  }, []);


  return (
    <Card className={classes.parentItem}>
      <Typography style={{color: `${circleColorTable[plant]}`, padding: "5px 0px 5px 0px"}}>{plant.toUpperCase()}</Typography>
      <div className={classes.figureCardDiv}>
        {
          environments.map((env) =>
            <Figure key={env.toString()}
                    environment={env}
                    values={recentStatus[env]}
                    plant={plant}/>)
        }
      </div>
    </Card>
  );
}
