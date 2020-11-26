import React, {useLayoutEffect, useRef, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";


const MenuButton = () => {
  return (
      <IconButton
          aria-label="show more"
          aria-haspopup="true">
        <MenuIcon style={{ color: 'white' }} />
      </IconButton>
  )
}

const drawerWidth = 240;
const useStyles =  makeStyles(theme => ({
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
    fontFamily : "Tangerine, cursive",
    justifyContent: 'center',
    fontSize : 'xx-large',
    position : 'absolute',
    width : props => `${props.page_width}px`,
    flexGrow: 1,
    textAlign: "center",
    display: 'flex',
    color : props => props.fontColor
  },
  notification: {
    color : 'black',
  },
  menuWrapper : {
    borderRadius: '20px',
    background: props => props.customTheme,
    boxShadow: props => props.neumOutShadow
  }
}))

export default function PermanentAppBar(props) {
  const {colors} = require('root/values/colors');
  const [width, setWidth] = React.useState(window.innerWidth);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const roundFigureRef = useRef();

  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor,
    page_width : width
  });

  useLayoutEffect(() => {
    if (roundFigureRef.current) {
      setDimensions({
        width: roundFigureRef.current.offsetWidth,
        height: roundFigureRef.current.offsetHeight
      });
    }
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });
    return () => {
      setDimensions({width: 0, height: 0 })
    }
  }, [width]);

  return (  
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky"
              className={classes.appBar}
              elevation={0}
              color='primary'
              ref={roundFigureRef}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Kairos
          </Typography>
          <div className={classes.grow} />
            <div className={classes.menuWrapper} >
              <Menu MenuButton={MenuButton} />
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
