import { makeStyles } from '@material-ui/core/styles';

const settingsStyle = makeStyles(theme =>({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor : 'rgba(255, 255, 255, 0)',
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
  modalContainer : {
    marginBottom: '20px',
    display : 'flex',
    flexWrap : 'wrap',
    flexDirection: 'row',
  },
  slider : {
    padding: '0% 1% 0% 1%'
  },
  parentItem : {
    textAlign: 'center',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
    borderRadius : '15px',
    padding : '20px',
  },
  controlCardButtons : {
    height : '100%',
    position: 'relative',
    borderRadius: '0.5rem',
    padding: '20px 0 10px 0',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
  },
  alignButtonIcon : {
    display:'inline',
    alignItems:'center',
    width:'20%',
    margin:'auto',
    textAlign:'center',
  },
  alignNameBox : {
    color : 'black',
    textAlign:'center',
    margin:'auto',
    display:'inline',
    alignItems:'center',
    width:'60%',
  },
  disable: {
    color : 'white',
    textAlign:'center',
    margin:'auto',
    display:'inline',
    alignItems:'center',
    width:'calc(100%/3)',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item : {
    padding:'8px',
  },
  controlCardDiv : {
    paddingBottom:'3% 0 3% 0',
    height:'100%'
  },
  controlCardBox : {
    height:'25%'
  },
  figureCardDiv : {
    display:'grid',
    gridTemplateColumns: '33.3% 33.3% 33.3%',
  },
  TimePickerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  title : {
    fontWeight : '1000',
    color:'white',
    padding: '10px 0 10px 0'
  },
})
)

export default settingsStyle;
