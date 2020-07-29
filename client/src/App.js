import React from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import video from 'assets/img/drone.mp4';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
  video : {
  position: 'fixed',
  right: '0',
  bottom: '0',
  minWidth: '100%',
  minHeight: '100%',
  overflow:'none'
}}));

export default function App() {
    const classes = useStyles();

    return (
      <BrowserRouter>
      <div style={{backgroundColor:"#1E2425",position: 'fixed',  right: 0, bottom: 0, width: '100vw', height: '100vh',overflowX:'hidden'}}>
          <Route exact path="/" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/history" component={() => <History /> } />
          <Route path="/settings" component={() => <Settings /> } />
          {/* <Route path="/account" component={() => <Account /> } />
          <Route component={NotFound} /> */}
          </div>
      </BrowserRouter>
    )
}
/*
<video autoPlay muted loop className={classes.video}>
        <source src={video} type="video/mp4" />
      </video>
 */
