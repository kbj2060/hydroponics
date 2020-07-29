import { makeStyles } from '@material-ui/core/styles';

const settingsStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  container : {
    padding :'15px 30px 15px 30px'
  },
  item : {
    padding:'15px',
  },
  background : {
    position : 'relative',
    display : 'flex',
    backgroundColor:'white',
    margin : '30px 0px 30px 0px',
    flexDirection:'column',
    boxShadow : '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius : '6px',
  },
  sliderDiv : {
    display:'grid', 
    gridTemplateColumns: 'auto auto auto',
    padding: '3% 0 3% 0'
  },
  parentItem : {
    backgroundColor : 'rgba(255, 255, 255, 0)',
    borderRadius : '15px',
    padding : '20px',
  },
  applyButton:{
    backgroundColor: '#c96b8b',
    fontColor:'white',
  }
})
)

export default settingsStyle;
