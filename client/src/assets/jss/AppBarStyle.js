import {  makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const appBarStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor : 'rgba(255, 255, 255, 0)',
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
    backgroundColor : 'rgba(255, 255, 255, 0)',
    [theme.breakpoints.up('md')]: {
      marginRight : -drawerWidth,
    },
  },
  drawer: {
    display : 'none',
    [theme.breakpoints.up('md')]: {
      borderRadius: '0.5rem',
      display : 'contents',
      width: drawerWidth,
      flexShrink: 0,
      overflow : 'hidden',
    },
  },
  paper: {
    width: drawerWidth,
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
    overflowX : 'hidden',
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
    display: 'flex',
    color : "white"
  },
  notification: {
    color : 'white',
  }
}));

export default appBarStyle;
