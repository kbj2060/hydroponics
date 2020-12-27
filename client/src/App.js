import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { store } from "./redux/store";
import {saveState} from "./components/LocalStorage";
import Setting from "./views/Setting/Setting";
import axios from "axios";
import {useDispatch} from "react-redux";
import {checkEmpty} from "./components/utils/CheckEmpty";
import {controlSwitch} from "./redux/modules/ControlSwitch";
import {saveSetting} from "./redux/modules/ControlSetting";
import Scheduler from "./views/Scheduler/Scheduler";
import {createMuiTheme} from "@material-ui/core";

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

class ThemeProvider extends React.Component<{ theme: Theme, children: React.ReactNode }> {
  render() {
    return null;
  }
}

export default function App() {
  const {settings:defaultSetting} = require('root/values/defaults.json');
  const {autoItem, machines} = require('root/values/preferences.json');
  const dispatch = useDispatch();
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme
  });

  const getControlSetting = async () => {
    await axios.get('/api/get/load/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem,
	      section : "s1"
      }
    }).then(({data}) => {
      if(Object.keys(data).length === Object.keys(defaultSetting).length){
        dispatch(saveSetting(data))
      } else {
        dispatch(saveSetting(defaultSetting));
      }
    })
  }

  // TODO : app.js 로드 될 때 모든 섹션의 스위치, 자동화 정보 등을 리덕스에 넣어놓는 것을 구현할 것.
  // TODO : 백엔드 섹션 추가한 것처럼 리덕스도 섹션을 다 추가할 것.
  const getControlSwitch =  async (machine) => {
    return await axios.get('/api/get/query/last', {
      params: {
        where: machine,
        whereColumn: 'machine',
        selects: ['status'],
        table: 'switch'
      }})
  }

  const getControlSwitches = () => {
    machines['s1'].forEach((machine) => {
      getControlSwitch(machine)
        .then(({data}) => {
          if(checkEmpty(data)){
            dispatch(controlSwitch({[machine]: false}))
          } else {
            dispatch(controlSwitch({[machine]: data[0]['status'] === 1}))
          }
      })
    })
  }

  useEffect(() => {
    getControlSwitches();
    getControlSetting();
    saveState( store.getState() );
  }, []);

  store.subscribe(() => {
    saveState( store.getState() );
  });

  return (
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
      </BrowserRouter>
  )
}
