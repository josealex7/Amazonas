import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import {RegistroApp} from './RegistroApp';
import {Provider} from 'react-redux';
import {store} from './store/store';
import { ThemeProvider } from '@mui/material'

ReactDOM.render(
  <Provider store={store}>
    <RegistroApp />
  </Provider>,
  document.getElementById('root')
);