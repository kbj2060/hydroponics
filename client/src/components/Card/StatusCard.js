import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import Figure from "../Figure/Figure";
import axios from "axios";

const INTERVAL_TIME = 5000

export default function StatusCard(props) {
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
      const {data} = await axios.get(`/api/${plant}`);
      setRecentStatus(data[0]);
    } catch (e) {
      console.log('FETCH STATUS ERROR.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, INTERVAL_TIME);
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
      <Typography style={{color: "white", padding: "5px 0px 5px 0px"}}>{plant.toUpperCase()}</Typography>
      <div className={classes.figureCardDiv}>
        {
          ["humidity", "temperature", "co2"].map((measurement) =>
            <Figure key={measurement.toString()}
                    measurement={measurement}
                    dimensions={dimensions}
                    values={recentStatus[measurement]}/>)
        }
      </div>
    </Card>
  );
}
