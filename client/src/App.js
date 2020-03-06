import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';


export default function App() {
    // const classes = useStyles();
    const [token, setToken] = React.useState('');

    const onGetToken = (newToken) => {
      setToken(newToken);
    }

    return (
      <BrowserRouter>
        <div style={{width: '100vw', height: '100vh',overflowX:'hidden'}}>
          <Route exact path="/" component={() => <Login passToken={onGetToken}/>} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/history" component={History} />
          {/* <Route component={NotFound} /> */}
          {console.log(token)}
        </div>
      </BrowserRouter>
    )
}
