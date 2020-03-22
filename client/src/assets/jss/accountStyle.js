import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const accountStyle = makeStyles(theme =>({
    root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
    [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        }
    },
    container : {
      padding :'15px 30px 15px 30px'
    },
    secondContainer : {
      height:'100%', 
      marginTop:'0px'
    },
    item : {
      adding:'5px',
      alignSelf: 'center',
    },
    accountCircle : {
      width: 'auto', 
      height: '90px', 
      color: 'black',
    },
    item2 : {
      padding:'5px', 
      textAlign:'left', 
      alignSelf:'center',
    },
    text : {
      fontSize : '16px'
    },
    img : {
      width: '97%',
      height: '85%',
      backgroundposition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      justifyContent: 'center',
      alignItems: 'center',
    }
}))

export default accountStyle;
