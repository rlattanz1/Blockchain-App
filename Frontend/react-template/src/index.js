import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './reset.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// root reducer containing all our other reducers
function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
};

const renderApplication = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
