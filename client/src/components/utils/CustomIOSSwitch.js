import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";


const {colors} = require('root/values/colors');
export const CustomIOSSwitch = withStyles((theme) => ({
  root: {
    width: 48,
    height: 26,
    padding: 0,
  },
  switchBase: {
    border: 'none',
    borderRadius: '15px',
    background: colors.customTheme,
    overflow: 'hidden',
    boxShadow: colors.neumInShadow,
    padding: 1,
    display:'flex',
    alignItems:'center',
    transition: 'transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    '&$checked': {
      transform: 'translateX(23px)',
      '& + $track': {
        backgroundColor : colors.customTheme,
        boxShadow: colors.neumInShadow,
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
    background: colors.customTheme,
    boxShadow:  colors.neumOutShadow,
  },
  track: {
    border: 'none',
    borderRadius: 26 / 2,
    backgroundColor: colors.customTheme,
    boxShadow : colors.neumInShadow,
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