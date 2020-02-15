import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const cardStyle = makeStyles(theme =>({
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
}));

export default cardStyle;
