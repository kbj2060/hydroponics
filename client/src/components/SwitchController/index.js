import React from 'react';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import IconWrapper from "./IconWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {store} from "../../redux/store";

const useStyles = makeStyles({
  controlCardButtons : {
    height : '100%',
    position: 'relative',
    padding: '3% 10%',
    borderRadius: '20px',
    background: props => props.customTheme,
    boxShadow: props => props.neumOutShadow
  },
  controlCardDiv : {
    paddingBottom:'3% 0 3% 0',
    height:'100%'
  },
  controlCardBox : {
    height: props => `calc(100%/${(props.n_machines+1)})`
  },
  alignNameBox : {
    color : 'white',
    textAlign:'left',
    margin:'auto',
    display:'inline',
    alignItems:'left',
    width:'calc(100%/4)',
  },
  alignButtonIcon : {
    display:'inline-flex',
    justifyContent:'flex-end',
    width:'calc(100%/4)',
    margin:'auto',
    textAlign:'center',
  },
})

export default function SwitchController() {
  const currentPage = store.getState()['controlPage'];
  const {machines} = require('root/values/preferences');
  const {colors} = require('root/values/colors');
  const classes = useStyles({
      customTheme : colors.customTheme,
      n_machines : machines[currentPage].length,
      neumOutShadow : colors.neumOutShadow
    })

    return (
      <Card className={classes.controlCardButtons}>
          <div className={classes.controlCardDiv}>
              { machines[currentPage].map(machine => {
                  return (
                    <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                      <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                        <IconWrapper key={machine} machine={machine} />
                      </Box>
                      <CurrentChecker machine={machine}/>
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
