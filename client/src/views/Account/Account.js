import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from 'assets/jss/accountStyle';
import AppBar from 'components/AppBar/AppBar';
import CustomGrid from 'components/Grid/Grid';
import CustomTable from 'components/Table/Table';
import CustomList from 'components/List/List';
import CustomDatePicker from 'components/DatePicker/DatePicker';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

const CustomButton = withStyles({
    root : {
        backgroundColor: '#405C5A',
        color:'white',
        fontSize : '14px',
        marginTop : '27px',
        '&:hover' : {
            backgroundColor: '#405C5A',
        }
    },
})(Button);

export default function Account() {
    const classes = useStyles();
    const [isApplied, setIsApplied] = useState(false)

    const handleOnClick = () => {
        setIsApplied(true);
    }
	// switch history / figures histroy / details(ip, type, name, server, ) / plant pictures history /  
	return (
    <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>
        <CustomGrid xs={12} sm={12} md={12}>
            <Typography>Account</Typography>
            <AccountCircle style={{ height: 'auto', width:'60px', color: '#405C5A' }}/>
            <Typography>kim</Typography>
            <Typography>ADMIN</Typography>
            <Typography>Location</Typography>
            <Typography>Web Server IP</Typography>
            <Typography>Sensor Broker IP</Typography>
            <Typography>Prisma Server IP</Typography>
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Switch History</Typography>
            <CustomTable />
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Figure History</Typography>
            <CustomDatePicker />
                <CustomButton   onClick={ handleOnClick } 
                                variant="contained" 
                                size="medium"> APPLY </CustomButton>
                {/* dialog here */}
                {/* <CustomList height={300} /> */}
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Camera History</Typography>
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Location</Typography>
        </CustomGrid>
        </Grid>
    </div>
		)
	}
