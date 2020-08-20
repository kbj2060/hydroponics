import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from '../../assets/jss/LoginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import axios from "axios";
import {loginFailure, loginSuccess} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {checkEmpty} from "../../components/utils";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";


export default function Login() {
    const classes = useStyles();
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
      await axios.post('/api/signin', {
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
    }, [auth])

    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form>
              <p className={classes.title}>W J</p>
              <TextField id="name" className={classes.login} placeholder="이름"  type="text" onChange={handleChange('name')}/>
              <TextField id="pw" className={classes.login} placeholder="비밀번호" type="password" onChange={handleChange('pw')}/>
              <div>
                  <button onClick={handleSubmit} className={classes.loginButton} type="submit" >Log in</button>
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
                    <Button onClick={handleClose} color="primary" autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </form>
        </div>
    </Background>    
    )
}