import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodolistsContextProvider } from './context/TodolistContext'
import { AuthContextProvider } from './context/AuthContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TodolistsContextProvider>
    <App />
    </TodolistsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
