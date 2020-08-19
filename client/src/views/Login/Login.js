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


export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [login, setLogin] = React.useState({
        name: "",
        pw: ""
    });
    const [auth, setAuth] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = target => (e) => {
      setLogin({ ...login, [target]: e.target.value })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      loginRequest(login.name, login.pw).then((res) => {
        setAuth(store.getState()['authentication']);
        if (auth.login === "SUCCESS"){

        }
        else {

        }
        handleClickOpen();
      })
    };

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
              console.log(data)
              checkEmpty(data)?
                dispatchLoginFailure() : dispatchLoginSuccess(username)
          }).catch((error) => {
              dispatchLoginFailure()
          });
    }


  /*
			store.subscribe(() => {
					//const auth = store.getState()['authentication'];
			})*/

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
                  <DialogTitle id="alert-dialog-title">{"로그인"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">

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