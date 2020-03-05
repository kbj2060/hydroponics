import React from 'react';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
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
        setLogin({...login, name: event.target.value});
    }
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setLogin({...login, password : event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
    <ApolloProvider client={client}>
    <Background>
    <div className={classes.loginForm}>
            <form>
                <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text"  onChange={handleNameChange} />
                <input className={classes.login} placeholder="Password" type="password" onChange={handlePasswordChange} />
                <div>
                <Mutation mutation={LOGIN}>
                {(loginMutation, { data }) => (
                    <button onClick={(e) => {
                        e.preventDefault();
                        loginMutation({
                            variables: {
                                name: login.name,
                                password: login.password
                            }
                        })
                        .then((res) => { 
                            setLogin({ loginState: !login.loginState }) 
                            const token = res.data.login.token; 
                        })
                        .catch(err => {
                            alert('Your Account is not valid!');
                            console.log(err)})
                    }}
                    className={classes.loginButton} type="submit">Log in</button>
                )}
                </Mutation>
                </div>
            </form>
        </div>
    </Background>
    </ApolloProvider>
    )
    
}