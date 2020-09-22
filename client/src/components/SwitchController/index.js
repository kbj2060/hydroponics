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
import {saveState} from "../LocalStorage";
import {store} from "../../redux/store";

export default function SwitchController() {
    const classes = useStyles();
    const machines = [ "cooler", "heater", "led", "fan", "waterpump" ]
    //const dispatch = useDispatch();

    const currentACdividier = (machine) =>{
        if(machine === 'heater' || machine === 'cooler'){
          return <CurrentChecker machine={'airconditioner'}/>
        } else {
          return <CurrentChecker machine={machine}/>
        }
      }
/*

    const getControlSwitch =  async (machine) => {
      return await axios.get('/api/get/query/last', {
        params: {
          where: machine,
          whereColumn: 'machine',
          selects: ['status'],
          table: 'switch'
        }})
    }
    const getControlSwitches = async () => {
      let result = {}
      machines.forEach( (machine) => {
        getControlSwitch(machine).then(({data}) => {
          const status = data[0]['status'] === 1
          result[machine] = status
        })
      })
      return result
    }

    useEffect(() => {
      getControlSwitches().then((res) => {
        dispatch(saveSwitch(res))
      })
    }, []);
*/

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
