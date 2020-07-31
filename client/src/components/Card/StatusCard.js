import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import Figure from "../Figure/Figure";
import axios from "axios";

export default function StatusCard(props) {
  const {plant} = props;
  const measurementArr = ["humidity", "temperature", "co2"]
  const classes = useStyles();
  const cardGridRef = useRef();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const INTERVALTIME = 10000

  //const {data} = await axios.get('/api/temperature');
  //console.log(data);

  let progresses = {
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  }

  const fetchData = async () => {
    try {
      const {data} = await axios.get(`/api/${plant}`);
      progresses = data[0]
      console.log(progresses)
    } catch (e) {
      console.log('err')
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, INTERVALTIME);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (cardGridRef.current) {
      setDimensions({
        width: cardGridRef.current.offsetWidth,
        height: cardGridRef.current.offsetHeight
      });
    }
    const listener = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', listener);
  }, [width]);

  return (
    <Card className={classes.parentItem} ref={cardGridRef}>
      <Typography style={{color: "white", padding: "5px 0px 5px 0px"}}>{plant.toUpperCase()}</Typography>
      <div className={classes.figureCardDiv}>
        {
          measurementArr.map((measurement) =>
            <Figure key={measurement.toString()}
                    measurement={measurement}
                    dimensions={dimensions}
                    progress={progresses[measurement]}/>)
        }
      </div>
    </Card>
  );
}
