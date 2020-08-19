import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from '../../assets/jss/LoginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import axios from "axios";
import {loginFailure, loginSuccess} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";

export default function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        username: "",
        password: ""
    });

    const loginRequest = (username, password) => {
        return axios.post('/api/signin', {
            params: {
                username: username,
                password: password
            }})
          .then((response) => {
              console.log(dispatch(loginSuccess(username)));
          }).catch((error) => {
              dispatch(loginFailure());
          });}



    const handleChange = target => (e) => {
        setState({ ...state, [target]: e.target.value })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      loginRequest(state.username, state.password).then(r =>
      console.log(r));
    };


    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form>
                <p className={classes.title}>SMART FARM</p>
                <input className={classes.login} placeholder="Name"  type="text" onChange={handleChange('username')}/>
                <input className={classes.login} placeholder="Password" type="password" onChange={handleChange('password')}/>
                <div>
                    <button onClick={handleSubmit} className={classes.loginButton} type="submit" >Log in</button>
                </div>
            </form>
        </div>
    </Background>    
    )
}