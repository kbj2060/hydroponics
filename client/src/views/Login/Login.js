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
import AlertDialog from "../../components/LoginAlert";

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [login, setLogin] = React.useState({
        name: "",
        pw: ""
    });
    const [auth, setAuth] = React.useState({});
    const [dialogOpen, setDialogOpen] = React.useState(false);

    store.subscribe(() => {
        //const auth = store.getState()['authentication'];
    })

    const dispatchLoginSuccess = (username) => {
        return dispatch(loginSuccess(username))
    }

    const dispatchLoginFailure = () => {
        return dispatch(loginFailure())
    }

    const resetLogin = () => {
        setLogin({
            name: "",
            pw: ""
        })
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
          });}

    const handleChange = target => (e) => {
        setLogin({ ...login, [target]: e.target.value })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      loginRequest(login.name, login.pw).then((res) => {
        setAuth(store.getState()['authentication']);
        if (auth.login === "SUCCESS"){

        } else {

        }
        setDialogOpen(true);
      })
    };

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
                <AlertDialog result={auth.login} open={dialogOpen} />
            </form>
        </div>
    </Background>    
    )
}