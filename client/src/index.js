import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Provider, useDispatch} from 'react-redux'
import {store} from "./redux/store";

const theme = createMuiTheme({
  Typography: {
    fontFamily : '"Noto Sans KR", serif',
    },
})

ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
