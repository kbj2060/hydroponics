import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon:{
    height : 'auto',
    width : 'auto'
  }
}));

export default function DashboardIcon(props) {
  const classes = useStyles();

  return (
   <SvgIcon className={classes.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/><path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
    );
}
