import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from '../../assets/jss/LoginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import axios from "axios";
import {loginFailure, loginSuccess} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {checkEmpty} from "../../components/utils";

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [login, setLogin] = React.useState({
        name: "",
        pw: ""
    });

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
    const loginRequest = (username, password) => {
        return axios.post('/api/signin', {
            params: {
                username: username,
                password: password
            }})
          .then(({data}) => {
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
        console.log(store.getState()['authentication']);
      })
    };

    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form>
                <p className={classes.title}>W J</p>
                <input className={classes.login} placeholder="이름"  type="text" onChange={handleChange('name')}/>
                <input className={classes.login} placeholder="비밀번호" type="password" onChange={handleChange('pw')}/>
                <div>
                    <button onClick={handleSubmit} className={classes.loginButton} type="submit" >Log in</button>
                </div>
            </form>
        </div>
    </Background>    
    )
}