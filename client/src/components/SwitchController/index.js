import React from 'react';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import CurrentChecker from './CurrentChecker';
import SettingModal from "../SettingModal";
import IconWrapper from "./IconWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
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

  const SwitchWrapper = ({children}) => {
    return (
      <div className={classes.controlCardDiv}>
        {children}
      </div>
    )
  }

  const Icons = ({machine}) => {
    return (
      <Box className={classes.alignNameBox} flexGrow={1} p={1} >
        <IconWrapper key={machine} machine={machine} />
      </Box>
    )
  }

  const Checkers = ({machine}) => {
    return (
      <Box className={classes.checker} flexGrow={1} p={1} >
        <CurrentChecker machine={machine}/>
        <AutoChecker machine={machine} />
      </Box>
    )
  }

  const PowerSwitch = ({machine}) => {
    return (
      <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
        <Switch key={machine} machine={machine} />
      </Box>
    )
  }

  const Switches = () => {
    return (
      <>
      {
      machines[current_page].map(machine =>
        <Box key={machine.toString()} className={classes.controlCardBox} display='flex'>
          <Icons machine={machine}/>
          <Checkers machine={machine}/>
          <PowerSwitch machine={machine}/>
        </Box>)
      }
      </>
    )
  }

  const SettingModalWrapper = () => {
    return (
      <Box style={{textAlign:'center'}}>
       <SettingModal />
      </Box>
    )
  }
    return (
      <Card className={classes.controlCardButtons}>
        <SwitchWrapper>
          <Switches />
          <SettingModalWrapper />
        </SwitchWrapper>
      </Card>
    );
}
