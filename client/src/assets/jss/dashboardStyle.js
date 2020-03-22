import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const dashboardStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      }
  },
  parentItem : {
    backgroundColor : 'white',
    borderRadius : '15px',
    padding : '20px',
  },
  controlCardButtons : {
    height : '22em',
    position: 'relative',
    borderRadius: '0.5rem',
    padding: '20px',
    backgroundColor: '#white !important',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
  },
  alignButtonIcon : {
    display:'inline',
    alignItems:'center',
    width:'calc(100%/3)',
    margin:'auto',
    textAlign:'center',
  },
  alignNameBox : {
    textAlign:'center',
    margin:'auto',
    display:'inline',
    alignItems:'center',
    width:'calc(100%/3)',
  },
  textColor : {
    padding : '5px 0 5px 0',
    color : '#405C5A',
    fontWeight : 'bold',
  },
  container : {
    padding :'15px 30px 15px 30px', 
    backgroundColor : 'rgba(255, 255, 255, 0)'
  },
  item : {
    padding:'15px'
  },
  controlCardDiv : {
    height:'100%', 
    paddingBottom:'3% 0 3% 0'
  },
  controlCardBox : {
    height:'calc(100% / 3)'
  },
  figureCardDiv : {
    display:'grid', 
    gridTemplateColumns: 'auto auto auto',
    padding: '3% 0 0 0'
  },
  containerHistroy : {
    padding :'15px 30px 15px 30px'
  }
}));

export default dashboardStyle;
