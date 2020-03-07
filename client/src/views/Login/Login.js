import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider,  Mutation, Query } from 'react-apollo';

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
    const classes = useStyles();
    
    const [login, setLogin] = React.useState({
        loginState: false, 
        name: '',
        password: '',
        token: '',
    });

    useEffect(() => {
        if (!login.token){ return } 
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
    const onHandleToken = () => {
        props.passToken(login.token);
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
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                    <button className={classes.loginButton} 
                            type="submit" 
                            onClick={(e) => {
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
                                        loginState: !preState.loginState,
                                        token: _token,
                                    }))
                                })
                                .catch(err => {
                                    alert('Your Account is not valid!');
                                    console.log(err)});
                                resetState();
                            }}>Log in</button>
                    )
                    }
                }
                </Mutation>
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
    </ApolloProvider>
    )
    
}