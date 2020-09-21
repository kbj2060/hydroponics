import { makeStyles } from '@material-ui/core/styles';

const dashboardStyle = makeStyles(() =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  parentItem : {
    textAlign : 'center',
    borderRadius : '15px',
    padding : '0px 0px 20px 0px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
  },
  controlCardButtons : {
    height : '100%',
    position: 'relative',
    borderRadius: '0.5rem',
    padding: '0 10%',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
  },
  alignButtonIcon : {
    display:'inline-flex',
    justifyContent:'flex-end',
    width:'calc(100%/4)',
    margin:'auto',
    textAlign:'center',
  },
  alignNameBox : {
    color : 'white',
    textAlign:'left',
    margin:'auto',
    display:'inline',
    alignItems:'left',
    width:'calc(100%/4)',
  },
  optionBox : {
    color : 'white',
    textAlign:'center',
    margin:'auto',
    display:'inline',
    alignItems:'center',
    width:'calc(100%/4)',
  },
  disable: {
   visibility : 'hidden'
  },
  textColor : {
    padding : '5px 0 5px 0',
    color : 'white !important',
    fontWeight : 'bold',
  },
  container : {
    //padding :'15px 30px 15px 30px',
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  item : {
    padding:'8px',
  },
  controlCardDiv : {
    paddingBottom:'3% 0 3% 0',
    height:'100%'
  },
  controlCardBox : {
    height:'20%'
  },
  figureCardDiv : {
    display:'grid',
    gridTemplateColumns: '33.3% 33.3% 33.3%',
  },
  containerHistory : {
    padding :'15px 0px 15px 0px',
  }
}));

export default dashboardStyle;
