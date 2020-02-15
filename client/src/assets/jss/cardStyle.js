import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const cardStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
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
  iconCard : props => ({
    padding : '20px',
    width : "8em",
    height : '8em',
    position: 'relative',
    zIndex : '2',
    left : '30px',
    top : '40px',
    backgroundColor : props.backgroundColor,
    borderRadius: '0.5rem',
  }),
  itemGrid : {
    height : '80%',
    margin : '-36px 0 -36px 0',
  },
  figureCard : {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundcolor: 'black',
    margin : '10px',
    position: 'relative',
    top: '-50px',
    zIndex : '1',
  },
  figureCardContents : {
      marginTop : '40px',
  },
  controlCardContents : {

  },
  controlCardWeather : {
    height : '20em',
    position: 'relative',
    padding: theme.spacing(2),
    margin : '10px',
    padding : '14px',
    },
  controlCardButtons : {
    height : '20em',
    position: 'relative',
    borderRadius: '0.5rem',
    backgroundImage: 'linear-gradient(0deg, #f0ce84, #ffc952)',
    padding: theme.spacing(2),
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
    height : '12px',
    width : '12px',
    margin : 'auto',
    backgroundColor : 'green',
    borderRadius : '50%',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px',
  },
  redDot : {
      height : '12px',
      width : '12px',
      margin : 'auto',
      backgroundColor : 'red',
      borderRadius : '50%',
      backgroundColor: 'red',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px',
  }
}));

export default cardStyle;
