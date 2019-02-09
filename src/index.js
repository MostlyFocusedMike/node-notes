import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import MyProvider from './context/ContextProvider';

ReactDOM.render(
    <BrowserRouter>
        <MyProvider>
            <App />
        </MyProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
