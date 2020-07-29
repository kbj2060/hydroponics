import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon:{
    height : 'auto',
    width : 'auto',
    fill : '#FFCB3A',
  }
}));

export default function ControlIcon(props) {
  const classes = useStyles();

  return (
      <SvgIcon className={classes.icon} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        fontSize='large' viewBox='0 0 512 512'>
           <g>
           	<g>
           		<path d="M344.864,112.832c-26.176-33.408-53.248-67.904-75.072-104.96C266.912,3.008,261.664,0,256,0s-10.912,3.008-13.76,7.872
           			c-21.824,37.024-48.896,71.552-75.072,104.928C114.112,180.448,64,244.352,64,320c0,105.888,86.112,192,192,192
           			s192-86.112,192-192C448,244.384,397.92,180.48,344.864,112.832z M256,480c-88.224,0-160-71.776-160-160
           			c0-64.608,46.784-124.256,96.352-187.456c21.632-27.584,43.84-55.904,63.648-86.24c19.808,30.336,42.016,58.688,63.648,86.272
           			C369.216,195.744,416,255.424,416,320C416,408.224,344.224,480,256,480z"/>
           	</g>
           </g>
           <g>
           	<g>
           		<path d="M208,192c-26.464,0-48,21.536-48,48s21.536,48,48,48s48-21.536,48-48S234.464,192,208,192z M208,256
           			c-8.832,0-16-7.168-16-16c0-8.832,7.168-16,16-16c8.832,0,16,7.168,16,16C224,248.832,216.832,256,208,256z"/>
           	</g>
           </g>
           <g>
           	<g>
           		<path d="M304,352c-26.464,0-48,21.536-48,48s21.536,48,48,48s48-21.536,48-48S330.464,352,304,352z M304,416c-8.8,0-16-7.2-16-16
           			s7.2-16,16-16s16,7.2,16,16S312.8,416,304,416z"/>
           	</g>
           </g>
           <g>
           	<g>
           		<path d="M347.296,228.704c-6.24-6.24-16.384-6.24-22.624,0l-160,160c-6.24,6.24-6.24,16.384,0,22.624
           			C167.808,414.432,171.904,416,176,416s8.192-1.568,11.296-4.672l160-160C353.536,245.088,353.536,234.944,347.296,228.704z"/>
           	</g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
           <g>
           </g>
      </SvgIcon>
    );
}
