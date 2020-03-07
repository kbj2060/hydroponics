import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider,  Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

const client = new ApolloClient({
link: new HttpLink({
    uri: 'http://localhost:4000',
}),
cache: new InMemoryCache()
});

const LOGIN = gql`
  mutation loginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

export default function Login(props) {
    const classes = useStyles();
    
    const [login, setLogin] = React.useState({
        isAuth: false, 
        name: '',
        password: '',
        token: '',
    });

    useEffect(() => {
        if(!login.token || login.token === undefined) {return}
        else{ onHandleLogin(); }
      }, [login.token]);

    const handleNameChange = (event) => {
        event.preventDefault();
        setLogin({...login, name: event.target.value});
    }
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setLogin({...login, password : event.target.value});
    }
    const onHandleLogin = () => {
        props.passLogin(login.token, login.isAuth);
    }
    const resetState = () => {
        setLogin({
            ...login,
            name: '',
            password: '',
            token: '',
        })
    }

    return(
    <ApolloProvider client={client}>
    <Background  image={backgroundImage}>
        <div className={classes.loginForm}>
            <form>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text" value={login.name} onChange={handleNameChange} />
                <input className={classes.login} placeholder="Password" type="password" value={login.password} onChange={handlePasswordChange} />
                <div>
                <Mutation mutation={LOGIN}>
                {(loginMutation, { loading, error, data }) => {
                if (loading) return(<p>Loading...</p>)
                if (error) return(alert('your account is not valid!'))
                return (
                    <button onClick={(e) => {
                        e.preventDefault();
                        loginMutation({
                            variables: {
                                name: login.name,
                                password: login.password
                            }
                        })
                        .then((res) => {
                            const _token = res.data.login.token;
                            setLogin(preState => ({ 
                                ...login,
                                isAuth: !preState.isAuth,
                                token: _token,
                            }))
                            resetState();
                        })
                        .catch(err => {
                            alert('Your Account is not valid!');
                            console.log(err)});
                        
                    }}
                    className={classes.loginButton} type="submit">Log in</button>
                )}}
                </Mutation>
                </div>
            </form>
        </div>
        {login.isAuth ? <Redirect to="/dashboard" /> : null}
    </Background>
    </ApolloProvider>
    )
    
}