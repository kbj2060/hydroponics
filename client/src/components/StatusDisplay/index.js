import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import Figure from "./Figure";
import axios from "axios";

export default function StatusDisplay(props) {
  const {statusUpdateTime, environments} = require('../../PROPERTIES');
  const {plant} = props;
  const classes = useStyles();
  const {circleColorTable, WordsTable} = require('../../PROPERTIES');
  const [recentStatus, setRecentStatus] = useState({
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  });

/*  function statusReset() {
    setRecentStatus({
      "humidity": 0,
      "co2": 0,
      "temperature": 0
    })
  }*/

  const convertFixedFloat = (x) => {
      return Number.parseFloat(x).toFixed(1);
  }

  const fetchStatus = async () => {
    await axios.get('/api/getStatus', {
      params: {
        table: plant,
        selects: environments,
        num: 1
      }
    }).then(({data:status}) => {
      for (const [key, value] of Object.entries(status)) { status[key] = convertFixedFloat(value); }
      setRecentStatus(status);
    }).catch((err) => {
      console.log('FETCH STATUS ERROR!');
      console.log(err);
    });
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
      <Typography style={{color: `${circleColorTable[plant]}`, padding: "5px 0px 5px 0px"}}>{WordsTable[plant]}</Typography>
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
