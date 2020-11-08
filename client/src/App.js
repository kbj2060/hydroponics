import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch} from 'react-redux'
import { store } from "./redux/store";
import {saveState} from "./components/LocalStorage";
import axios from "axios";
import {saveSetting} from "./redux/modules/ControlSetting";
import {controlSwitch} from "./redux/modules/ControlSwitch";
import {checkEmpty} from "./components/utils/CheckEmpty";

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
    backgroundColor: props => props.backgroundColor,
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100%',
    overflowX:'hidden'
  }
}));

export default function App() {
  //const classes = useStyles();
  const {machines, autoItem} = require('root/values/preferences');
  const {defaultSetting} = require('root/values/defaults')
  const dispatch = useDispatch();
  const {colors} = require('root/values/colors')
  const classes = useStyles({
    backgroundColor : colors['pageBackground']
  });

  const getControlSetting = async () => {
    await axios.get('/api/get/load/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem
      }
    }).then(({data}) => {
      if(Object.keys(data).length === Object.keys(defaultSetting).length){
        dispatch(saveSetting(data))
      } else {
        dispatch(saveSetting(defaultSetting));
      }
    })
  }

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
    machines.forEach((machine) => {
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
            <Login />
          </Route>
          <Route exact path="/dashboard" >
            <Dashboard />
          </Route>
        </div>
      </BrowserRouter>
  )
}
