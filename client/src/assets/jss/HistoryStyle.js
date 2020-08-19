import { makeStyles } from '@material-ui/core/styles';

const HistoryStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  foreground : (props) => ({
    margin : '-30px 15px 0px 15px',
    position : 'relative',
    height : 'auto',
    width : 'auto',
    padding : '3px',
    backgroundColor : '#353A3B',
    boxShadow : '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    borderRadius : '6px',
  }),
  background : {
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
    position : 'relative',
    display : 'flex',
    margin : '30px 0px 0px 0px',
    flexDirection:'column',
    boxShadow : '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius : '6px',
  },
  chart : {
    width:'100%',
  },
  footer : {
    padding : '10px 20px 10px 20px',
    flex : '1 1 auto',
    position : 'relative',
    textAlign : 'left',
    '& h4, & p' : {
      margin : '0px',
      padding : '3px',
    }
  },
  updateTime : {
    display : 'inline',
    verticalAlign : 'middle',
    fontSize : '10px',
    fontWeight : 'bold',
    color : 'white',
  },
  updateInfo : {
    margin : 0,
    paddingTop : '10px',
    display : 'inlineBlock',
    borderTopWidth : '1px',
    borderTopStyle : 'solid',
    borderTopColor : 'white',
    textAlign : 'left',
    verticalAlign : 'middle',
  },
  textColor : {
    color : 'white',
    fontWeight : 'bold',
  }
}));

export default HistoryStyle;
