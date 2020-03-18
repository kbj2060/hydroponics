import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: '#ABBFBE',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      }
  },
  card: {
    position: 'relative',
    zIndex : '1',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '23em',
  },
  noPaddingCard : {
    position: 'relative',
    zIndex : '1',
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '10em',
  }
}))

export default function CustomGrid(props) {
  const classes = useStyles();
  const { children, xs, sm, md, noPadding } = props;

  return(
  <Grid item xs={xs} sm={sm} md={md} style={{padding:'15px',}}>
    <Card className={noPadding ? classes.noPaddingCard : classes.card}>
      <div style={{height:'100%', paddingBottom:'3% 0 3% 0'}}>
        {children}
      </div>
    </Card>
  </Grid>
  )
}