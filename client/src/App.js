import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Setting from "./views/Setting/Setting";
import axios from "axios";
import { useDispatch} from "react-redux";
import {checkEmpty} from "./components/utils/CheckEmpty";
import { saveSwitch} from "./redux/modules/ControlSwitch";
import {saveSetting} from "./redux/modules/ControlSetting";
import Scheduler from "./views/Scheduler/Scheduler";
import {saveState} from "./components/LocalStorage";


const useStyles = makeStyles(() =>({
  video : {
  position: 'fixed',
  right: '0',
  bottom: '0',
  minWidth: '100%',
  minHeight: '100%',
  overflow:'none'
  },
  parent : {
    backgroundColor: props => props.customTheme,
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100%',
    overflowX:'hidden'
  }
}));

export default function App() {
  const {auto:defaultSetting, switches:defaultMachineStatus} = require('root/values/defaults.json');
  const {autoItem} = require('root/values/preferences.json');
  const dispatch = useDispatch();
  const {colors} = require('root/values/colors.json')
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles({
    customTheme : colors.customTheme
  });

  const getControlAuto = async () => {
    await axios.get('/api/get/load/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem["s1"],
	      section : "s1"
      }
    }).then(({data}) => {
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
          section : "s1"
        }
      }).then(({data}) => {
          if(checkEmpty(data)){
            dispatch(saveSwitch(defaultMachineStatus))
            saveState("switches", defaultMachineStatus)
          } else {
            let status = {}
            Object.keys(defaultMachineStatus).forEach((machine) => {
              status[machine] = data["s1"].includes(machine)
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
    isLoading ||
    <BrowserRouter>
        <div className={classes.parent}>
          <Route exact path="/">
            <Login page={"login"}/>
          </Route>
          <Route exact path="/무들로29" >
            <Dashboard page={"무들로29"}/>
          </Route>
          <Route exact path="/scheduler" >
            <Scheduler page={"scheduler"}/>
          </Route>
          <Route exact path="/setting" >
            <Setting page={"setting"} />
          </Route>
        </div>
      {console.log("app")}
      </BrowserRouter>
  )
}
