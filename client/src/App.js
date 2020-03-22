import React from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import Account from './views/Account/Account';
// import Account from './views/NotFound/NotFound';

import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    // const classes = useStyles();

    return (
      <BrowserRouter>
        <div style={{width: '100vw', height: '100vh',overflowX:'hidden'}}>
          <Route exact path="/" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/history" component={() => <History /> } />
          <Route path="/settings" component={() => <Settings /> } />
          <Route path="/account" component={() => <Account /> } />
          {/* <Route component={NotFound} /> */}
        </div>
      </BrowserRouter>
    )
}
