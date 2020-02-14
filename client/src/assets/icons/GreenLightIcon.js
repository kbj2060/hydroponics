import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon:{
    display : 'block',
    margin : 'auto',
    height:"24px",
    width:"24px"
  }
}));

export default function GreenLightIcon(props) {
  const classes = useStyles();

  return (
    	<SvgIcon className={classes.icon} height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#e4edfb"/><path d="m480 256c0 123.710938-100.289062 224-224 224s-224-100.289062-224-224 100.289062-224 224-224 224 100.289062 224 224zm0 0" fill="#6ae5d3"/><path d="m192 374.625-64-64c-6.246094-6.25-6.246094-16.378906 0-22.625s16.375-6.246094 22.625 0l41.375 41.375 169.375-169.375c6.25-6.246094 16.378906-6.246094 22.625 0s6.246094 16.375 0 22.625zm0 0" fill="#0ac1a7"/>
    </SvgIcon>
    );
}
