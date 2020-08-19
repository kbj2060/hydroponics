import React from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { store } from "./redux/store";

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
    const _store = store;

    return (
      <Provider store={_store}>
        <BrowserRouter>
          <div className={classes.parent}>
            <Route exact path="/" component={() => <Login />} />
            <Route path="/dashboard" component={() => <Dashboard />} />
            <Route path="/settings" component={() => <Settings /> } />
          </div>
        </BrowserRouter>
      </Provider>
    )
}
/*
import video from 'assets/img/drone.mp4';

<video autoPlay muted loop className={classes.video}>
        <source src={video} type="video/mp4" />
      </video>
 */
/* <Route path="/account" component={() => <Account /> } />
          <Route path="/history" component={() => <History /> } />
          <Route component={NotFound} /> */
