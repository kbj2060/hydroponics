import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import NavDrawer from 'components/Drawer/NavDrawer';
import RightDrawer from 'components/Drawer/RightDrawer';

import styles from 'assets/jss/appBarStyle.js'


// 페이지 상단의 앱바를 만드는 함수형 컴포넌트
export default function PermanentAppBar() {
  const classes = styles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  }
  //모바일은 화면을 작게 할 시, 더보기를 만들어 알림/ 프로필이 뜨게 한다.
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Button onClick={toggleDrawer('right', true)}>Open Right</Button>
  //   <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
  //     {sideList('right')}
  //   </Drawer>

    // <Menu
    //   anchorEl={mobileMoreAnchorEl}
    //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   id={mobileMenuId}
    //   keepMounted
    //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   open={isMobileMenuOpen}
    //   onClose={handleMobileMenuClose}
    // >
    //   <MenuItem>
    //     <IconButton aria-label="show 11 new notifications" color="inherit">
    //       <Badge badgeContent={11} color="secondary">
    //         <NotificationsIcon />
    //       </Badge>
    //     </IconButton>
    //     <p>알  림</p>
    //   </MenuItem>
    //   <MenuItem>
    //     <IconButton
    //       aria-label="account of current user"
    //       aria-controls="primary-search-account-menu"
    //       aria-haspopup="true"
    //       color="inherit"
    //     >
    //       <AccountCircle />
    //     </IconButton>
    //     <p>프로필</p>
    //   </MenuItem>
    // </Menu>
  // );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"
      className={classes.appBar}
      elevation={0}
      >
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          수경재배 관리 시스템
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="검색.."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={100} color="secondary">
              <NotificationsIcon style={{ color: '#3c4858' }} />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle style={{ color: '#3c4858' }}/>
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <RightDrawer />
        </div>
      </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <NavDrawer />
      </Drawer>
    </div>
  );
}
//IconButton aria-controls : MenuId
//       {renderMobileMenu}
