import React,{ useEffect } from 'react';
import Background from '../Background/Background';
import backgroundImage from '../../assets/img/background2.jpg'
import axios from "axios";
import {loginFailure, loginSuccess} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {checkEmpty} from "root/client/src/components/utils/CheckEmpty";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link, useHistory} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {resetState} from "../../components/LocalStorage";
import {makeStyles} from "@material-ui/core/styles";

const {colors} = require('root/values/colors')
const useStyles = makeStyles(()=>({
  root : {
    width: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm : {
    borderRadius : '10px',
    backgroundColor: props => props.customTheme,
    boxShadow: props => props.neumOutShadow,
    width:'300px',
    height:'300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign : 'center',
  },
  login : {
    display : 'block',
    border:  'none',
    borderBottom:  props => `solid 1px ${props.fontColor}`,
    margin: '5px 0 5px 0',
    '&:focus' : {
      borderBottom: props => `solid 1px ${props.fontColor}`,
      outline: '0',
      boxShadow: '0 2px 6px -8px rgba($primary, .45)',
    },
  },
  loginButton : {
    cursor: 'pointer',
    backgroundColor: props => props.customTheme,
    width:  'auto',
    minWidth:  '100px',
    borderRadius:  '24px',
    textAlign:  'center',
    padding:  '15px 40px',
    marginTop:  '20px',
    color:  props => props.fontColor,
    fontSize:  '14px',
    marginLeft:  'auto',
    fontWeight:  '500',
    boxShadow: props => props.neumOutShadow,
    border:  'none',
    transition:  'all .3s ease',
    outline: '0',
  },
  title : {
    color: props => props.fontColor,
    fontSize : 'xx-large',
    marginTop:'0px',
    fontFamily : "Tangerine, cursive",
  },
  input : {
    color : props => props.fontColor
  }
}));

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.fontColor,
    }
  },
})(TextField);

export default function Login() {
    const classes = useStyles({
      customTheme : colors.customTheme,
      neumOutShadow : colors.neumOutShadow,
      fontColor : colors.fontColor,
    });
    const dispatch = useDispatch();
    const [login, setLogin] = React.useState({
        name: "",
        pw: ""
    });
    const [auth, setAuth] = React.useState({
      login: {
        status: 'INIT'
      },
      status: {
        isLoggedIn: false,
        currentUser: '',
      }
    });
    const [open, setOpen] = React.useState(false);
    const history = useHistory()

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = target => (e) => {
      setLogin({ ...login, [target]: e.target.value })
    }

    const dispatchLoginSuccess = (username) => {
      return dispatch(loginSuccess(username))
    }

    const dispatchLoginFailure = () => {
      return dispatch(loginFailure())
    }

    const loginRequest = async (username, password) => {
      await axios.post('/api/post/signin', {
        params: {
          username: username,
          password: password
        }})
        .then(({data}) => {
          checkEmpty(data)?
            dispatchLoginFailure() : dispatchLoginSuccess(username)
          const updatedAuth = store.getState()['authentication'];
          setAuth(updatedAuth);
        }).catch((error) => {
          dispatchLoginFailure()
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginRequest(login.name, login.pw)
    };

    const resetAuth = () => {
      setAuth({
        login: {
          status: 'INIT'
        },
        status: {
          isLoggedIn: false,
          currentUser: '',
        }
      })
    }

    useEffect(() => {
      //TODO : 로그인 성공 후 다시 로그인 페이지로 들어갈 시 처리.
      console.log(store.getState()['authentication']);
      if (auth.login.status === 'INIT'){ return; }

      if ( !checkEmpty(auth) && auth.login.status === "SUCCESS" ){
        history.push("/dashboard")
      } else { handleClickOpen(); }

      return () => {resetAuth()}
    }, [auth, history])

    return(
      <div className={classes.root}>
      <div className={classes.loginForm}>
            <form>
              <p className={classes.title}>Kairos</p>
              <CssTextField id="name" InputProps={{
                className: classes.input
              }} className={classes.login} placeholder="이름"  type="text" onChange={handleChange('name')}/>
              <CssTextField id="pw" InputProps={{
                className: classes.input
              }} className={classes.login} placeholder="비밀번호" type="password" onChange={handleChange('pw')}/>
              <div>
                <Link to={`/dashboard`} forcerefresh="true">
                  <button onClick={handleSubmit} className={classes.loginButton} type="submit" >로그인</button>
                </Link>
              </div>
              <div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"로그인 실패"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {"이름 혹은 비밀번호를 확인해주세요."}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="black" autoFocus>
                      확인
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </form>
        </div>
      </div>
    )
}