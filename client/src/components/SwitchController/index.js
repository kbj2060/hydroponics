import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import useStyles from 'assets/jss/DashboardStyle';
import CurrentChecker from './CurrentChecker';

export default function Index() {
    const {machines} = require("../../PROPERTIES")
    const classes = useStyles();

    return (
      <Card className={classes.controlCardButtons}>
          <div className={classes.controlCardDiv}>
              { machines.map(machine => {
                  return (
                      <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                          <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                              <Typography className={classes.textColor} variant="subtitle2">{machine}</Typography>
                          </Box>
                          <CurrentChecker machine={machine}/>
                          <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                              <Switch machine={machine} />
                          </Box>
                      </Box>
                  )
              }) }
          </div>
      </Card>
    );
}
