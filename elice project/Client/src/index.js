import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
// import your route components too
import App from "./App";

import { CookiesProvider } from 'react-cookie'; // react-cookie 라이브러리 설치

// import store from './app/store'
// import { Provider } from 'react-redux' // npm install @reduxjs/toolkit react-redux

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);