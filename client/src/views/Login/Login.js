import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
mutation loginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
        token
    }
}
`;

// const FEED = gql`
//     query feedQuery($filter: String, $skip:Int, $first:Int  ){
//      feed(filter: $filter, skip: $skip, first: $first){
//          switches{
//             machine
//             status
//             updatedAt
//          }
//          count
//      }
// }`;

export default function Login(props) {
    const history = useHistory();
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (isAuth === null) { localStorage.setItem("isAuth", JSON.stringify(false)) }
    else if (isAuth) { history.push('/dashboard') }

    const classes = useStyles();
    const [login, setLogin] = React.useState({
        name: '',
        password: '',
        token: '',
        loginClicked : false,
    });
    const [loginMutation ] = useMutation(LOGIN);

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

    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form onSubmit={(event) => {
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
                })}}>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
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