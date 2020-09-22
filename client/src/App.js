import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Provider, useDispatch} from 'react-redux'
import { store } from "./redux/store";
import {saveState} from "./components/LocalStorage";
import axios from "axios";
import {saveSetting} from "./redux/modules/ControlSetting";
import {saveSwitch} from "./redux/modules/ControlSwitch";

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
    backgroundColor:"#1E2425",
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100%',
    overflowX:'hidden'
  }
}));

export default function App() {
    const classes = useStyles();
    const {machines} = require('root/init_setting');
    /*const dispatch = useDispatch();

    const getControlSetting = async () => {
      await axios.get('/api/get/load/auto/json').then(({data}) => {
        dispatch(saveSetting(data))
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
      let result = {}
      machines.forEach( (machine) => {
        getControlSwitch(machine).then(({data}) => {
          const status = data[0]['status'] === 1
          result[machine] = status
        })
      })
      dispatch(saveSwitch(result))
    }*/

    useEffect(() => {
      /*getControlSwitches();
      getControlSetting();*/
      saveState( store.getState() );
    }, []);

    store.subscribe(() => {
      saveState( store.getState() );
    });

    return (
      <Provider store={store}>

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
      </Provider>
    )
}
