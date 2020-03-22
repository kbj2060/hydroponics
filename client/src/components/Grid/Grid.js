import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
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
  },
  cardDiv : {
    height:'100%', 
    paddingBottom:'3% 0 3% 0'
  },
  item : {
    padding:'15px'
  }
}))

export default function CustomGrid(props) {
  const classes = useStyles();
  const { children, xs, sm, md, noPadding } = props;

  return(
  <Grid item xs={xs} sm={sm} md={md} className={classes.item}>
    <Card className={noPadding ? classes.noPaddingCard : classes.card}>
      <div className={classes.cardDiv}>
        {children}
      </div>
    </Card>
  </Grid>
  )
}