import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const accountStyle = makeStyles(theme =>({
    root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
    },
    container : {
      padding :'15px 30px 15px 30px'
    },
    secondContainer : {
      height:'100%', 
      marginTop:'0px',

    },
    item : {
      adding:'5px',
      alignSelf: 'center',
      backgroundColor : 'rgba(255, 255, 255, 0)',
    },
    accountCircle : {
      width: 'auto', 
      height: '90px', 
      color: 'white',
    },
    item2 : {
      padding:'5px', 
      textAlign:'left', 
      alignSelf:'center',
    },
    text : {
      fontSize : '16px',
      color:'white',
    },
    img : {
      paddingTop : "10px",
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
