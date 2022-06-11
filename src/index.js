import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './lib/redux/store';
import theme from './lib/common/theme/theme';



ReactDOM.render(
  <>
    
    <Provider store={store}>
      <ThemeProvider theme={theme}>
       <CssBaseline />
        <App />
      </ThemeProvider>
      {/* <AppSkeleton /> */}
    </Provider>
  </>
  ,
  document.getElementById('root')
);