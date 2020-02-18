import { makeStyles } from '@material-ui/core/styles';

const HistoryStyle = makeStyles(theme =>({
  foreground : (props) => ({
    margin : '-30px 15px 0px 15px',
    position : 'relative',
    height : 'auto',
    width : 'auto',
    padding : '15px',
    boxShadow : '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80.4)',
    background : `linear-gradient(60deg, ${props.gradationStart}, ${props.gradationEnd})`,
    borderRadius : '6px',
  }),
  background : {
    position : 'relative',
    display : 'flex',
    backgroundColor:'white',
    margin : '30px 0px 30px 0px',
    flexDirection:'column',
    boxShadow : '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius : '6px',
  },
  chart : {
    width:'100%',
  },
  footer : {
    padding : '15px 20px',
    flex : '1 1 auto',
    position : 'relative',
  },
  updateTime : {
    display : 'inline',
    verticalAlign : 'middle',
    fontSize : '10px',
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
}));

export default HistoryStyle;
