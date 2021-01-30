import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Setting from "./views/Setting/Setting";
import Scheduler from "./views/Scheduler/Scheduler";
const moment = require('moment')

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
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme
  })

  console.log(`\n-------------------------${moment.utc().local().format('YYYY/MM/DD HH:mm:ss')}-------------------------`)

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
