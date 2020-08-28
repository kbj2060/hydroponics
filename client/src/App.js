import React, {useEffect} from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { store } from "./redux/store";
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

    useEffect(() => {
      saveState( store.getState() );
    }, []);

    store.subscribe(() => {
      saveState( store.getState() );
    });

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className={classes.parent}>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/dashboard" >
              <Dashboard />
            </Route>
            <Route exact path="/settings" >
              <Settings />
            </Route>
          </div>
        </BrowserRouter>
      </Provider>
    )
}
