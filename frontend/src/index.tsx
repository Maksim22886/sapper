import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import { AppProvider } from './AppContext';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AppProvider> */}
        <App />
      {/* </AppProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
