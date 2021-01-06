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

export default function Dashboard({page}) {
  const classes = useStyles();
  const {environments, sections, machines} = require('root/values/preferences.json')
  const {auto:defaultSetting, switches:defaultMachineStatus} = require('root/values/defaults.json');
  const {autoItem} = require('root/values/preferences.json');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
	const current_section = getCurrentPage();

  const getControlAuto = async () => {
    await axios.get('/api/get/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem[current_section],
	      section : current_section
      }
    }).then(({data}) => {
      console.log(data)
      if(Object.keys(data).length === Object.keys(defaultSetting).length){
        dispatch(saveSetting(data))
        saveState("auto", data)
      } else {
        dispatch(saveSetting(defaultSetting));
        saveState("auto", defaultSetting)
      }
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
      })
  }

  useEffect(() => {
      getControlSwitches();
      getControlAuto();
      setIsLoading(false);
      return () => {
        setIsLoading(true);
      }
  }, []);

  return (
    CheckLogin() && !isLoading  ?
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
      </div> : null
      );
    }
