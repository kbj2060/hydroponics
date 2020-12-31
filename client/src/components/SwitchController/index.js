import React from 'react';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import IconWrapper from "./IconWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {store} from "../../redux/store";
import AutoChecker from "./AutoChecker";

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
  checker : {
    margin:'auto',
  }
})

export default function SwitchController() {
  const {WordsTable} = require('root/values/strings.json')
  const han_current_page = decodeURI(window.location.pathname.replace('/',''))
  const current_page = WordsTable[han_current_page];
  const {machines} = require('root/values/preferences.json');
  const {colors} = require('root/values/colors.json');
  const classes = useStyles({
      customTheme : colors.customTheme,
      n_machines : machines[current_page].length,
      neumOutShadow : colors.neumOutShadow
    })

    return (
      <Card className={classes.controlCardButtons}>
          <div className={classes.controlCardDiv}>
              { machines[current_page].map(machine => {
                  return (
                    <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                      <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                        <IconWrapper key={machine} machine={machine} />
                      </Box>
                      <Box className={classes.checker} flexGrow={1} p={1} >
                        <CurrentChecker machine={machine}/>
                        <AutoChecker machine={machine} />
                      </Box>
                      <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                        <Switch key={machine} machine={machine} />
                      </Box>
                    </Box>
                  )}
                )}
              <Box style={{textAlign:'center'}}>
                <SettingModal />
              </Box>
          </div>
      </Card>
    );
}
