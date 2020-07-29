import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import {useHistory} from "react-router";

export default function Login(props) {
    const history = useHistory();
    const classes = useStyles();

    const [login, setLogin] = React.useState({
        name: '',
        password: '',
        token: '',
        loginClicked : false,
    });

    useEffect(() => {
        if(login.loginClicked){
            localStorage.setItem("token", login.token)
            localStorage.setItem("isAuth", JSON.stringify(true));
            history.push("/dashboard")
        }
    }, [login.loginClicked]);

    const handleChange = target => (e) => {
        setLogin({ ...login, [target]: e.target.value })
    }

/*
    const handleSubmit = (event) => {
      event.preventDefault();
      loginMutation({
          variables: {
              name: login.name,
              password: login.password
          }
      })
      .then((res) => {
          const _token = res.data.login.token;
          setLogin({...login,token : _token, loginClicked : true})
      })
      .catch((err)=> {
          alert('Your Account Is Not Valid!')
          console.log(err)
      })};
*/

    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form>
                <p className={classes.title}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text" onChange={handleChange('name')}/>
                <input className={classes.login} placeholder="Password" type="password" onChange={handleChange('password')}/>
                <div>
                    <button className={classes.loginButton} type="submit" >Log in</button>
                </div>
            </form>
        </div>
    </Background>    
    )
}