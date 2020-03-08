import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider,  Mutation } from 'react-apollo';
import { createHttpLink } from "apollo-link-http";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
let token = '';
const headers = {
  authorization: token ? `Bearer ${token}` : null
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

const theme = createMuiTheme({
  Typography: {
    fontFamily : '"Noto Sans KR", serif'
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
  ,
  document.getElementById('root')
)

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
