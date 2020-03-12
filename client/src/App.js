import React from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';

import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    // const classes = useStyles();

    const [token, setToken] = React.useState('');
    const onGetToken = (newToken) => {
      setToken( newToken );
    }

    return (
      <BrowserRouter>
        <div style={{width: '100vw', height: '100vh',overflowX:'hidden'}}>
          <Route exact path="/" component={() => <Login passToken={onGetToken} />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/history" component={() => <History /> } />
          <Route path="/settings" component={() => <Settings /> } />
          {/* <Route component={NotFound} /> */}
        </div>
      </BrowserRouter>
    )
}
