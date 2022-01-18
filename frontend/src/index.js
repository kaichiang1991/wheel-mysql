import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter basename={process.env.REACT_APP_BASENAME || '/'}>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
)
