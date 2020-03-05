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

const LOGIN = gql`
  mutation loginMutation($name: String!, $password: String!) {
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
        loginState: false, 
        name: '',
        password: '',
    });

    const handleNameChange = (event) => {
        event.preventDefault();
        setLogin({name: event.target.value});
    }
    const handlePasswordChange = (event) => {
        event.preventDefault();
        console.log(login)
        setLogin({...login, password : event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
    <ApolloProvider client={client}>
    <Background>
    <div className={classes.loginForm}>
        <Mutation mutation={LOGIN}>
            {(loginMutation, { data }) => (
            <form>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text"  onChange={handleNameChange} />
                <input className={classes.login} placeholder="Password" type="password" onChange={handlePasswordChange} />
                <div>
                    <button onClick={(e) => {
                        console.log(login.name);
                        e.preventDefault();
                        loginMutation({
                        variables: {
                            name: login.name,
                            password: login.password
                        }
                    }).then(res => {
                        console.log(res);
                    }).catch(err => console.log(err))}} className={classes.loginButton} type="submit">Log in</button>
                </div>
            </form>
            )}
        </Mutation>
        
        {}
    </div>
    </Background>
    </ApolloProvider>
    )
    
}