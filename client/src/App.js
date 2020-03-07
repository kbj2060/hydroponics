import React, {useEffect} from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


export default function App() {
    // const classes = useStyles();

  

    const [login, setLogin] = React.useState({
      token : '',
      isAuth : false,
    });

    const onGetLogin = (newToken, newIsAuth) => {
      setLogin({
        token : newToken, 
        isAuth : newIsAuth});
    }
    const headers = {
      authorization: token ? `Bearer ${token}` : null
    };
    const httpLink = createHttpLink({
      uri: 'http://localhost:4000',
      headers: headers,
    })
    const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    })
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div style={{width: '100vw', height: '100vh',overflowX:'hidden'}}>
          <Route exact path="/" component={() => <Login  passLogin={onGetLogin} />} />
          <Route path="/dashboard" component={() => <Dashboard isAuth={login.isAuth} />} />
          <Route path="/history" component={() => <History isAuth={login.isAuth} /> } />
          {/* <Route component={NotFound} /> */}
        </div>
      </BrowserRouter>
      </ApolloProvider>
    )
}
