import React from 'react';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background1.jpg'
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider,  Mutation } from 'react-apollo';

  const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000',
    }),
    cache: new InMemoryCache()
  });

const loginQuery = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

const Background = ({children}) => {
    return(
        <div style={{
            width: 'auto',
            height: '100%',
            backgroundposition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    )
}

export default function Login() {
    const classes = useStyles();
    const [login, setLogin] = React.useState({
        login: false, 
        name: '',
        password: '',
    });

    const handleNameChange = (event) => {
        setLogin({name: event.target.value});
    }
    const handlePasswordChange = (event) => {
        setLogin({password : event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
    <ApolloProvider client={client}>
    <Background>
    <div className={classes.loginForm}>
        <Mutation mutation={loginQuery}>
            {(loginMutation, { data }) => (
            <form onSubmit={handleSubmit}>
            <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text" value={login.name} onChange={handleNameChange} />
                <input className={classes.login} placeholder="Password" type="password" value={login.password} onChange={handlePasswordChange} />
                <div>
                    <button onClick={() => {loginMutation({variables: {    
                                                            name: login.name,
                                                            password: login.password
                                                            }})
                    .then(res => {
                    console.log('​LoginScreen -> res.data.login.token',res.data.login.token);
                    setLogin({login:true})
                    return res;
                    })
                    .catch(err => {
                    console.log('​LoginScreen -> err', err);
                    });
                }} 
            className={classes.loginButton} type="submit">Log in</button>
                </div>
            </form>
            )}
        </Mutation>
    </div>
    </Background>
    </ApolloProvider>
    )
    
}