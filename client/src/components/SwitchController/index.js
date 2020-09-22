import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import useStyles from '../../assets/jss/DashboardStyle';
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import OptionSwitch from "./OptionSwitch";

import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TemperatureIcon from '../../assets/icons/TemperatureIcon'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ToysIcon from '@material-ui/icons/Toys';
import OpacityIcon from '@material-ui/icons/Opacity';
import IconWrapper from "./IconWrapper";

export default function SwitchController() {
    const {WordsTable} = require('root/init_setting');
    const classes = useStyles();
    const machines = [ "cooler", "heater", "led", "fan", "waterpump" ]

    const currentACdividier = (machine) =>{
      if(machine === 'heater' || machine === 'cooler'){
        return <CurrentChecker machine={'airconditioner'}/>
      } else {
        return <CurrentChecker machine={machine}/>
      }
    }

    return (
      <Card className={classes.controlCardButtons}>
          <div className={classes.controlCardDiv}>
              { machines.map(machine => {
                  return (
                    <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                      <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                        <IconWrapper machine={machine} />
                      </Box>
                      {currentACdividier(machine)}
                      <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                        <Switch key={machine} machine={machine} />
                      </Box>
                    </Box>
                  )})}
              <Box style={{textAlign:'center'}}>
                <SettingModal />
              </Box>
          </div>
      </Card>
    );
}
