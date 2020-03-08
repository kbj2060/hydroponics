import React,{ useEffect } from 'react';
import Background from 'views/Background/Background';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background2.jpg'
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider,  Mutation } from 'react-apollo';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createHttpLink } from "apollo-link-http";
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
    const onHandleMutate = (event, loginMutation) => {
        event.preventDefault();
        loginMutation({
            variables: {
                name: login.name,
                password: login.password
            }
        })
        .then((res) => {
            const _token = res.data.login.token;
            setLogin({ ...login, token: _token });
            localStorage.setItem("isAuth", JSON.stringify(true));
            history.push("/dashboard")
        })
        .catch((err)=> {
            alert('Your Account Is Not Valid!')
            console.log(err)
        })
    }

    const headers = {
        authorization: login.token ? `Bearer ${login.token}` : null
    }
    const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'same-origin'
    })
    const client = new ApolloClient({
    link: httpLink,
    headers : headers,
    cache: new InMemoryCache()
    })

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
                    if (loading) 
                        return <ColorCircularProgress size={15} thickness={1} /> ;
                    return (
                    <button className={classes.loginButton} 
                            type="submit" 
                            onClick={(event) => {
                                onHandleMutate(event, loginMutation)}}>Log in</button>)
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
        {/* {localStorage.getItem("isAuth") ? <Redirect to="/dashboard" /> : null} */}
    </Background>
    </ApolloProvider>
    
    )
    
}