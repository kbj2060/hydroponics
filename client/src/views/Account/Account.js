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
import backgroundImage from 'assets/img/background3.jpg'
import Background from 'views/Background/Background';

const CustomButton = withStyles({
    root : {
        backgroundColor: '#405C5A',
        color:'white',
        fontSize : '14px',
        marginTop : '50px',
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
        <CustomGrid xs={12} sm={12} md={12} noPadding={true}>
            <Grid container spacing={2} style={{height:'100%', marginTop:'0px'}}>
                <Grid item xs={4} sm={4} md={4} style={{padding:'5px',alignSelf: 'center',}}>
                        <AccountCircle style={{width: 'auto', height: '90px', color: '#ABBFBE', }}/>
                        <Typography>kim</Typography>
                    <Typography>ADMIN</Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} style={{padding:'5px', textAlign:'left', alignSelf:'center'}}>
                    <Typography>Sensor Broker IP    : </Typography>
                    <Typography>MySQL Server IP     : </Typography>
                    <Typography>Web Server IP       : </Typography>
                    <Typography>Prisma Server IP    : </Typography>  
                    </Grid>
            </Grid>
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
