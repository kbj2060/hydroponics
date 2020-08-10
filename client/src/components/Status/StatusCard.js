import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import Figure from "./Figure";
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";

const circleColorTable = {
  'plant1' : "#FF925D",
  'plant2' : "#FFCB3A",
  'plant3' : "#FF4F61"
}

export default function StatusCard(props) {
  const {statusUpdateTime, environments} = require('../../PROPERTIES');
  const {plant} = props;
  const classes = useStyles();
  const cardGridRef = useRef();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [recentStatus, setRecentStatus] = useState({
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  });

  const fetchStatus = async () => {
    try {
      const recentIndex = 0;
      const { data: recentStatus } = await axios.get('/api/getStatus', {
        params: {
          table: plant,
          selects: environments,
          num: 1
        }
      });
      setRecentStatus(recentStatus[recentIndex]);
    } catch (e) {
      console.log('FETCH STATUS ERROR.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, statusUpdateTime);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (cardGridRef.current) {
      setDimensions({
        width: cardGridRef.current.offsetWidth,
        height: cardGridRef.current.offsetHeight
      });
    }
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });
  }, [width]);

  return (
    <Card className={classes.parentItem} ref={cardGridRef}>
      <Typography style={{color: `${circleColorTable[plant]}`, padding: "5px 0px 5px 0px"}}>{plant.toUpperCase()}</Typography>
      <div className={classes.figureCardDiv}>
        {
          environments.map((env) =>
            <Figure key={env.toString()}
                    environment={env}
                    dimensions={dimensions}
                    values={recentStatus[env]}
                    plant={plant}/>)
        }
      </div>
    </Card>
  );
}
