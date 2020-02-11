import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const cardStyle = makeStyles(theme =>({
  controlCard: {
    position: 'relative',
    top: '-7em',
    zIndex : '1',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '20em',
    display : 'table-row'
  },
  controlCardBody : {
    height : '15em',
    position: 'relative',
    zIndex : '2',
    top : '12em',
    margin : '0 3% 0 3%',
    backgroundColor : '#77AF9C',
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
  iconCard : props => ({
    padding : '20px',
    width : "8em",
    height : '8em',
    position: 'relative',
    zIndex : '2',
    left : '30px',
    top : '40px',
    backgroundColor : props.backgroundColor,
  }),
}));

export default cardStyle;
