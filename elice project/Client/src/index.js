import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
// import your route components too

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);