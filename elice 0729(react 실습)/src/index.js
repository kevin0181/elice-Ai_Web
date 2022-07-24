import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

import App from "./App";
import Review from "./Review";
import ReviewDetail from "./ReviewDetail";
import ReviewCreate from "./ReviewCreate";
import Header from "./Header";
import Footer from "./Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />}>
      </Route>
      <Route path="review" element={<Review />}>
      </Route>
      <Route path="review/:id" element={<ReviewDetail />}>
      </Route>
      <Route path="review/:id/update" element={<ReviewDetail />}>
      </Route>
      <Route path="review/create" element={<ReviewCreate />}>
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);