import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  Typography: {
    fontFamily : '"Noto Sans KR", serif',
    },
})

ReactDOM.render(
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
