import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
        if(!login.token || login.token === undefined) { return }
        else { onHandleToken(login.token); }
      }, [login.token]);

    const onHandleToken = async (_token) => {
      try { await props.passToken(_token); }
      catch(err){ console.log(err) }
    }

    return(
    <Background image={backgroundImage}>
        <div className={classes.loginForm}>
            <form onSubmit={(event) => {
                    event.preventDefault();
                    loginMutation({
                        variables: {
                            name: inputName.value,
                            password: inputPassword.value
                        }
                    })
                    .then((res) => {
                        const _token = res.data.login.token;
                        setLogin({  name : inputName,
                                    password : inputPassword,
                                    token: _token   });
                        localStorage.setItem("token", _token)
                        localStorage.setItem("isAuth", JSON.stringify(true));
                        history.push("/dashboard")
                    })
                    .catch((err)=> {
                        alert('Your Account Is Not Valid!')
                        console.log(err)
                    })}}>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input ref={(node) => { inputName = node }} className={classes.login} placeholder="Name"  type="text"  />
                <input ref={(node) => { inputPassword = node }} className={classes.login} placeholder="Password" type="password" />
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