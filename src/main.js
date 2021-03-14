import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
const Router = BrowserRouter;
import { Provider } from 'react-redux';
import store from '@/store';
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>

    ,
    document.querySelector('#app')
);