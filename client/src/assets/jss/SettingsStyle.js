import { makeStyles } from '@material-ui/core/styles';

const settingsStyle = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  container : {

  },
  item : {
    padding:'8px',
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
  slider : {
    padding: '0% 1% 0% 1%'
  },
  parentItem : {
    textAlign: 'center',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',    borderRadius : '15px',
    padding : '20px',
  },
})
)

export default settingsStyle;
