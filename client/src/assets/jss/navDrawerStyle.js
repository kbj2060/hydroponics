import { makeStyles } from '@material-ui/core/styles';

const navDrawerStyle = makeStyles({
  fullList: {
    margin : '10px 15px 0 15px',
    width: 240,
    overflowX : 'hidden',
  },
  drawerTitle : {
    position : 'relative',
    borderBottomColor : 'white',
    borderBottomWidth : '0.5px',
    borderBottomStyle : 'solid',
    padding:'10px',
    display:'inline-block',
  },
  listText : {
    fontSize:'14px',
    color:'white',
  },
  hoverItem : {
    borderRadius : '15px',
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    background: '#343B3C',
    border: '#343B3C'
  },
  menuItem : {
    textAlign:'center', 
    display:'inline-block',
     position:'relative', 
     height: "auto", 
     paddingTop : '10px'
  },
  text1 : {
    color: 'white', 
    fontSize : '13px'
  },
  text2 : {
    color: 'white', 
    fontSize : '10px'
  },
  text3 : {
    position: 'relative', 
    marginBottom:'6px', 
    color:'white'
  }
});

export default navDrawerStyle;
