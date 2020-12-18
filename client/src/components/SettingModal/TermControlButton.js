import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {controlSetting} from "../../redux/modules/ControlSetting";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {makeStyles} from "@material-ui/core/styles";
import update from 'react-addons-update';

const useStyles = makeStyles((theme) => ({
  iconButtonColor: {
    color: props => props.fontColor
  },
  term:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
}));

export default function TermControlButton({setting}) {
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    fontColor : colors.fontColor
  });
  const dispatch = useDispatch();
  const reduxSetting = store.getState()['controlSetting'][setting]
  const [term, setTerm] = React.useState(reduxSetting['term']);

  const handleTermUp = () => {
    const reduxSetting = store.getState()['controlSetting'][setting]
    setTerm(prev => {
      const updated = update(reduxSetting, {
        term : {$set: ++prev},
      })
      dispatch(controlSetting({[setting]: updated}));
      return prev
    })
  }

  const handleTermDown = () => {
    const reduxSetting = store.getState()['controlSetting'][setting]
    setTerm(prev => {
      if(prev <= 1) { return 1; }
      const updated = update(reduxSetting, {
        term : {$set: --prev},
      })
      dispatch(controlSetting({[setting]: updated}));
      return prev
    })
  }

  return(
    <>
      <p className={classes.term}>{term} 일</p>
      <div style={{display:'flex', flexDirection: 'column'}}>
        <IconButton onClick={handleTermUp} classes={{root : classes.iconButtonColor}} size='medium'>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton onClick={handleTermDown} classes={{root : classes.iconButtonColor}} size='medium'>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
    </>
  )
}
