import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Dashboard from './views/Dashboard/Dashboard';
import History from './views/History/History';
import Login from './views/Login/Login';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default function App() {
    // const classes = useStyles();
    const [token, setToken] = React.useState('');
    const [isAuth, setIsAuth] = React.useState(false);

    const onGetToken = (newToken) => {
      setToken(newToken);
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
          <Route exact path="/" component={() => <Login passToken={onGetToken}/>} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/history" component={History} />
          {/* <Route component={NotFound} /> */}
        </div>
      </BrowserRouter>
      </ApolloProvider>
    )
}
