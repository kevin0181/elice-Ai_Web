import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
// import your route components too
import App from "./App";

import { CookiesProvider } from 'react-cookie'; // react-cookie 라이브러리 설치

import Store from './app/Store'
import { Provider } from 'react-redux' // npm install @reduxjs/toolkit react-redux

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </BrowserRouter>
);