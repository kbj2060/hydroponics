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

export default function RedLightIcon(props) {
  const classes = useStyles();

  return (
     <SvgIcon className={classes.icon} height="512pt" viewBox="0 0 512 512.92258" width="512pt" xmlns="http://www.w3.org/2000/svg">
       <path d="m433.347656 512.921875h-352.898437c-27.71875-.003906-53.460938-14.355469-68.039063-37.9375-14.574218-23.578125-15.902344-53.023437-3.511718-77.820313l176.433593-352.914062c13.542969-27.117188 41.253907-44.25 71.566407-44.25s58.023437 17.132812 71.566406 44.25l176.433594 352.914062c12.390624 24.796876 11.0625 54.242188-3.511719 77.820313-14.574219 23.582031-40.320313 37.933594-68.039063 37.9375zm0 0" fill="#ff7761"/><g fill="#fff"><path d="m256.898438 128.203125c8.835937 0 16 7.164063 16 16v192c0 8.835937-7.164063 16-16 16-8.835938 0-16-7.164063-16-16v-192c0-8.835937 7.164062-16 16-16zm0 0"/>
       <path d="m240.898438 384.203125h32v32h-32zm0 0"/></g>
      </SvgIcon>
    );
}
