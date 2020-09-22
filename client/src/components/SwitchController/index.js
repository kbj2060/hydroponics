import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import useStyles from '../../assets/jss/DashboardStyle';
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import IconWrapper from "./IconWrapper";
import axios from "axios";
import {saveSwitch} from "../../redux/modules/ControlSwitch";
import {useDispatch} from "react-redux";

export default function SwitchController() {
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
                        <IconWrapper key={machine} machine={machine} />
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
