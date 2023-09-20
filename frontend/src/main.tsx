import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { OpenAPI } from './auto-api/index.ts';

OpenAPI.TOKEN = async () => localStorage.getItem('jwt-token') ?? '';
OpenAPI.HEADERS = { Accept: '*/*' };

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
