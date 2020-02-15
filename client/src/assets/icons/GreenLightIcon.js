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
      <SvgIcon  xmlns="http://www.w3.org/2000/svg" xmlnsSvg="http://www.w3.org/2000/svg">
       <g>
        <circle r="4" cy="54" cx="39.5" stroke-width="0" stroke="#000000" fill="#6ccc00" id="svg_1"/>
       </g>
      </SvgIcon>
    );
}
