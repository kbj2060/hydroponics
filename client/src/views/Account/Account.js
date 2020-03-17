import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from 'assets/jss/accountStyle';
import AppBar from 'components/AppBar/AppBar';

export default function Account() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar />
            <CssBaseline />
            <Grid container style={{padding :'15px 30px 15px 30px'}}>
            </Grid>
        </div>
        )
    }
