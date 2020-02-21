import { fade, makeStyles } from '@material-ui/core/styles';
import backgroundImage from 'assets/img/winter.jpg'

const drawerWidth = 240;

const appBarStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    backgroundColor : '#ddeeee',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      marginRight : -drawerWidth,
    },
  },
  drawer: {
    display : 'none',
    [theme.breakpoints.up('md')]: {
      backgroundColor : '#ddeeee',
      borderRadius: '0.5rem',
      display : 'contents',
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    overflow : 'hidden',
    background: "#304444"
  },
  paper: {
    background: "#304444"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    align: "center",
    color : '#3c4858',
    display: 'flex',
  },
  notification: {
    color : 'black',
  }
}));

export default appBarStyle;
