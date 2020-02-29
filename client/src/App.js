import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';

export default function App(props) {
    // const classes = useStyles();
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <Route exact path="/" component={Dashboard} />
          <Route path="/history" component={History} />
        </div>
      </BrowserRouter>
    )
}
