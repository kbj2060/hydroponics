import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CCTV from "root/client/src/components/CCTV";
import AppBar from 'root/client/src/components/AppBar';
import SwitchController from 'root/client/src/components/SwitchController';
import StatusDisplay from "root/client/src/components/StatusDisplay";
import useStyles from '../../assets/jss/DashboardStyle';
import MachinesHistoryCard from "root/client/src/components/MachinesHistory";
import EnvironmentsHistroy from "root/client/src/components/EnvironmentsHistroy";
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import getCurrentPage from "../../components/utils/getCurrentPage";
import axios from "axios";
import {saveSetting} from "../../redux/modules/ControlSetting";
import {saveState} from "../../components/LocalStorage";
import {checkEmpty} from "../../components/utils/CheckEmpty";
import {saveSwitch} from "../../redux/modules/ControlSwitch";
import {ErrorBoundary} from 'react-error-boundary'
const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, label, prettyPrint } = format;
const logDir = process.env.LOG_PATH

const moment = require('moment');

const timezone = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

export default function Dashboard({page}) {
  const classes = useStyles();
  const {environments, sections, machines} = require('root/values/preferences.json')
  const {auto:defaultSetting, switches:defaultMachineStatus} = require('root/values/defaults.json');
  const {autoItem} = require('root/values/preferences.json');
  const dispatch = useDispatch();
  const [isLoadingSwitch, setIsLoadingSwitch] = React.useState(true);
  const [isLoadingAuto, setIsLoadingAuto] = React.useState(true);

	const current_section = getCurrentPage();

  const myErrorHandler = (error, info) => {
    console.log("error")
    createLogger({
      format: combine(
        label({label: "DASHBOARD ERROR"}),
        timestamp({ format: timezone }),
        prettyPrint()
      ),
      transports: [
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
      ]}).error({
        level: 'error',
        message: `${error}`
      })
  }

  const getControlAuto = async () => {
    await axios.get('/api/get/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem[current_section],
        section : current_section
      }
    }).then(({data}) => {
      if(Object.keys(data).length === Object.keys(defaultSetting).length){
        dispatch(saveSetting(data))
        saveState("auto", data)
      } else {
        dispatch(saveSetting(defaultSetting));
        saveState("auto", defaultSetting)
      }
      setIsLoadingAuto(false);
    })
  }

  const getControlSwitches = async () => {
      await axios.get('/api/get/switch/now',{
        params: {
          section : current_section
        }
      }).then(({data}) => {
          if(checkEmpty(data)){
            dispatch(saveSwitch(defaultMachineStatus[current_section]))
            saveState("switches", defaultMachineStatus[current_section])
          } else {
            let status = {}
            machines[current_section].forEach((machine) => {
              status[machine] = data[current_section].includes(machine)
            })
            dispatch(saveSwitch(status))
            saveState("switches", status)
          }
        setIsLoadingSwitch(false);
      })
  }

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  useEffect(() => {
      getControlSwitches();
      getControlAuto();
      return () => {
        setIsLoadingSwitch(true);
        setIsLoadingAuto(true);
      }
  }, []);

  if(isLoadingAuto || isLoadingSwitch) {
    return null
  }

  return (
    CheckLogin() ?
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <div className={classes.root}>
          <AppBar page={page}/>
          <CssBaseline />
          <Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={4} className={classes.item}>
              <SwitchController />
            </Grid>
            <Grid item xs={12} sm={12} md={4} className={classes.item}>
              <CCTV />
            </Grid>
            <Grid item xs={12} sm={12} md={4} className={classes.item}>
              <MachinesHistoryCard />
            </Grid>
            {sections.map(section => { return(
                <Grid key={section.toString()} item xs={12} sm={12} md={4} className={classes.item} >
                  <StatusDisplay plant={section} />
                </Grid>)
              })}
            {environments.map(env => { return (
              <Grid key={env.toString()} item xs={12} sm={12} md={12} lg={4} xl={4}  className={classes.item}>
                <EnvironmentsHistroy environment={env} />
              </Grid>)
              })}
          </Grid>
        </div>
      </ErrorBoundary>
        : <Redirect to='/' />
  )
}
