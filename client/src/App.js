import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';

//
// const useStyles = makeStyles(theme => ({
//     wrapper: {
//       position: "relative",
//       top: "0",
//       height: "100vh"
//     },
// }));

export default function App() {
    // const classes = useStyles();
    return (
      <div>
        <AppBar />
        <Dashboard />
      </div>

    )
}
