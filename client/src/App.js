import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';

//import {  makeStyles } from '@material-ui/core/styles';
//
// const useStyles = makeStyles(theme => ({
//
// }));

class App extends React.Component {
  render(){
    return (
      <div>
        <AppBar />
        <Dashboard />
      </div>

    )
  }
}

export default App;
