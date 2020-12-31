import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import Figure from "./Figure";
import axios from "axios";
import {checkEmpty} from "../utils/CheckEmpty";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";


const useStyles = makeStyles({
  parentItem : {
    borderRadius: '20px',
    boxShadow: props => props.neumOutShadow,
    textAlign : 'center',
    padding : '0px 0px 20px 0px',
    background : props => props.customTheme,
  },
  figureCardDiv : {
    display:'grid',
    gridTemplateColumns: props => `${100/props.n_environment}% ${100/props.n_environment}% ${100/props.n_environment}% ${100/props.n_environment}%`,
  },
});

export default function StatusDisplay(props) {
  const {statusUpdateTime} = require('root/values/time.json');
  const {environments} = require('root/values/preferences.json')
  const {plant} = props;
  const {WordsTable} = require('root/values/strings.json');
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme,
    n_environment : environments.length,
    neumOutShadow : colors.neumOutShadow
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [recentStatus, setRecentStatus] = useState({
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  });

  const convertFixedFloat = (x) => {
      return Number.parseFloat(x).toFixed(1);
  }

  const fetchStatus = async () => {
    await axios.get('/api/get/query/last', {
      params: {
        where: plant,
        whereColumn: 'section',
        selects: environments,
        table: 'env'
      }
    }).then(({data:status}) => {
      if(checkEmpty(status)){ return; }
      for (const [key, value] of Object.entries(status[0])) {
        status[key] = convertFixedFloat(value);
      }
      setRecentStatus(status);
      setIsLoading(false);
    }).catch((err) => {
      console.log('FETCH STATUS ERROR!');
      console.log(err);
    });
  };

  const cleanup = () => {
    setRecentStatus({
    "humidity": 0,
    "co2": 0,
    "temperature": 0
  })
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      fetchStatus();
    }, parseInt(statusUpdateTime));
    return () => {
      clearInterval(interval)
      cleanup();
    };
  }, []);


  return (
    isLoading ||
    <Card className={classes.parentItem}>
      <Typography style={{color: `${colors[plant]}`, padding: "5px 0px 5px 0px"}}>{WordsTable[`plant-${plant}`]}</Typography>
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
