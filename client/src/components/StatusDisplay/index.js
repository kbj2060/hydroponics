import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { checkEmpty } from "../utils/CheckEmpty";
import Figure from "./Figure";


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

export default function StatusDisplay({plant}) {
  const {statusUpdateTime} = require('root/values/time.json');
  const {environments} = require('root/values/preferences.json')
  const {WordsTable} = require('root/values/strings.json');
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme,
    n_environment : environments.length,
    neumOutShadow : colors.neumOutShadow,

  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [recentStatus, setRecentStatus] = useState({
    "humidity": '0',
    "co2": '0',
    "temperature": '0'
  });

  const resetStatus = () => {
    setRecentStatus({
      "humidity": '0',
      "co2": '0',
      "temperature": '0'
    })
  }

  const fetchStatus = async () => {
    await axios.get('/api/get/environment/latter', {
      params: {
        section: plant,
      }
    }).then(({data}) => {
      checkEmpty(data) ? resetStatus() : setRecentStatus(data)
      setIsLoading(false);
    }).catch((err) => {
      console.log('FETCH STATUS ERROR!');
      console.log(err);
    });
  };

  const Figures = () => {
    return (
      <div className={classes.figureCardDiv}>
      {
      environments.map((env) =>
        <Figure key={env.toString()}
                environment={env}
                values={recentStatus[env]}
                plant={plant}/>)
      }
      </div>
    )
  }

  const FigureTitle = () => {
    return (
      <Typography style={{color: `${colors[plant]}`, padding: "5px 0px 5px 0px"}}>
        {WordsTable[`plant-${plant}`]}
      </Typography>
    )
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      fetchStatus();
    }, parseInt(statusUpdateTime));
    return () => {
      clearInterval(interval)
      resetStatus();
    };
  }, []);


  return (
    isLoading ||
    <Card className={classes.parentItem}>
      <FigureTitle />
      <Figures />
    </Card>
  );
}
