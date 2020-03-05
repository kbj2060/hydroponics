const navDrawerStyle = {
  list: {
    margin : '10px 15px 0 15px',
    width: 240,
    overflowX : 'hidden',
  },
  fullList: {
    margin : '10px 15px 0 15px',
    width: 240,
    overflowX : 'hidden',
    borderColor : '#ABBFBE',
  },
  drawerTitle : {
    position : 'relative',
    borderBottomColor : 'white',
    borderBottomWidth : '0.5px',
    borderBottomStyle : 'solid',
    padding:'10px',
    display:'inline-block',
  },
  clickedItem : {
    backgroundColor : '#ABBFBE',
    borderRadius : '15px',
  },
  listText : {
    fontSize:'14px',
    color:'white',
  },
  hoverItem : {
    borderRadius : '15px',
    '&:hover': {
      backgroundColor : "#ABBFBE",
      borderRadius : '15px',
    }
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
    "&:before": {
      position: "absolute",
      zIndex: "0",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: 'black',
      opacity: ".8"
    }
  },
};

export default navDrawerStyle;
