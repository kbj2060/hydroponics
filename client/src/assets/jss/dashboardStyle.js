import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const dashboardStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: '#eee',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      }
  },
  controlCard: {
    position: 'relative',
    top: '-4em',
    zIndex : '1',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '20em',
  },
  itemGrid : {
    position : 'relative',
    height : '80%',
    margin : '-40px 0 -40px 0',
    padding : '1%',
  },
  iconCard : props => ({
    padding : '1.5em',
    width : "5em",
    height : '5em',
    position : 'absolute',
    left : '7%',
    zIndex : '2',
    backgroundColor : props.backgroundColor,
    borderRadius: '0.5rem',
  }),
  figureCard : {
    padding: '15px',
    textAlign: 'center',
    margin : '8px',
    position: 'relative',
    //top: '-50px',
    zIndex : '1',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
  },
  figureCardContents : {
    padding : '0px',
    textAlign: 'right',
  },
  controlCardContents : {

  },
  controlCardWeather : {
    height : '20em',
    position: 'relative',
    margin : '10px',
    padding : '14px',
    },
  controlCardButtons : {
    height : '20em',
    position: 'relative',
    borderRadius: '0.5rem',
    backgroundImage: 'linear-gradient(0deg, #f0ce84, #ffc952)',
    padding: theme.spacing(2),
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
  },
  updateInfo : {
    margin : 0,
    paddingTop : '10px',
    display : 'inlineBlock',
    borderTopWidth : '1px',
    borderTopStyle : 'solid',
    borderTopColor : '#eee',
    textAlign : 'left',
    verticalAlign : 'middle',
  },
  updateTime : {
    display : 'inline',
    verticalAlign : 'middle',
    fontSize : '10px',
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
  greenDot : {
    marginLeft : '10px',
    height : '12px',
    width : '12px',
    margin : 'auto',
    backgroundColor : 'green',
    borderRadius : '50%',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px',
  },
  redDot : {
    marginLeft : '10px',
    height : '12px',
    width : '12px',
    margin : 'auto',
    borderRadius : '50%',
    backgroundColor: 'red',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px',
  }
}));

export default dashboardStyle;
