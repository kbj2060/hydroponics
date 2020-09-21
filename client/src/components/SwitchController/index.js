import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import useStyles from '../../assets/jss/DashboardStyle';
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import OptionSwitch from "./OptionSwitch";

export default function SwitchController() {
    const {machines, WordsTable} = require('root/init_setting');
    const classes = useStyles();

    return (
      <Card className={classes.controlCardButtons}>
          <div className={classes.controlCardDiv}>
              { machines.map(machine => {
                  return (
                      <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                          <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                              <Typography className={classes.textColor} variant="subtitle2">{WordsTable[machine.toLowerCase()]}</Typography>
                          </Box>
                          <CurrentChecker machine={machine}/>
                          <OptionSwitch machine={machine} />
                          <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                              <Switch key={machine} machine={machine} />
                          </Box>
                      </Box>
                  )
              }) }
              <Box style={{textAlign:'center'}}>
                <SettingModal />
              </Box>
          </div>
      </Card>
    );
}
