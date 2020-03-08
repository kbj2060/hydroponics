import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';

import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createHttpLink } from "apollo-link-http";
import { useMutation } from '@apollo/react-hooks';

const ColorCircularProgress = withStyles({
    root: {
      color: 'black',
    }
  })(CircularProgress);

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
    });
    const [loginMutation, { data }] = useMutation(LOGIN);

    let inputName = '';
    let inputPassword = '';
    useEffect(() => {
        console.log(login.token)
        if(!login.token || login.token === undefined) { return }
        else { onHandleToken(); }
      }, [login.token]);

    const handleNameChange = (event) => {
        event.preventDefault();
        setLogin({...login, name: event.target.value});
    }
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setLogin({...login, password : event.target.value});
    }
    const onHandleToken = (_token) => {
        props.passToken(_token);
    }

    return(
    <Background  image={backgroundImage}>
        <div className={classes.loginForm}>
            <form onSubmit={(event) => {
        console.log(inputName.value)
        event.preventDefault();
        loginMutation({
            variables: {
                name: inputName.value,
                password: inputPassword.value
            }
        })
        .then((res) => {
            console.log(inputName)
            const _token = res.data.login.token;
            setLogin({ ...login, token: _token });
            localStorage.setItem("isAuth", JSON.stringify(true));
            history.push("/dashboard")
        })
        .catch((err)=> {
            alert('Your Account Is Not Valid!')
            console.log(err)
        })}}>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input ref={(node) => { inputName = node }} className={classes.login} placeholder="Name"  type="text" onChange={handleNameChange} />
                <input ref={(node) => { inputPassword = node }} className={classes.login} placeholder="Password" type="password" value={login.password} onChange={handlePasswordChange} />
                <div>
                    <button className={classes.loginButton} type="submit" >Log in</button>
                {/* <Query query={FEED}>
                {({ data }) => {
                    return(<button className={classes.loginButton} 
                            type="submit" 
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(data);
                            }}>FEED</button>)
                }}
                </Query>                 */}
                </div>
            </form>
        </div>
    </Background>    
    )
    
}