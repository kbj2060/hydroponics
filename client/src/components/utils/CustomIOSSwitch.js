import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";

export const CustomIOSSwitch = withStyles((theme) => ({
  root: {
    width: 48,
    height: 26,
    padding: 0,
  },
  switchBase: {
    border: 'none',
    borderRadius: '15px',
    background: '#161717',
    overflow: 'hidden',
    boxShadow: 'inset -5px 5px 10px #090909, \n' +
      '            inset 5px -5px 10px #232525',
    padding: 1,
    display:'flex',
    alignItems:'center',
    transition: 'transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    '&$checked': {
      transform: 'translateX(23px)',
      '& + $track': {
        backgroundColor : '#95A68A',
        boxShadow: 'inset -6px 6px 12px #717e69, inset 6px -6px 12px #b9ceab',
        opacity: 1,
        overflow: 'hidden',
      },
    },
    '&$focusVisible $thumb': {
      border: 'none',
      overflow: 'hidden',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: '15px',
    background: '#161717',
    boxShadow:  '5px 5px 10px #090909, \n' +
      '             -5px -5px 10px #232525',
  },
  track: {
    border: 'none',
    borderRadius: 26 / 2,
    backgroundColor: '#C1D4D9',
    boxShadow : 'inset 6px 6px 12px #93a1a5,inset -6px -6px 12px #efffff',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {   },
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    >
    </Switch>
  );
});