import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

import Review from "./Review";
import ReviewDetail from "./ReviewDetail";
import ReviewCreate from "./ReviewCreate";
import Header from "./Header";
import Footer from "./Footer";
import ReviewUpdate from "./ReviewUpdate";
import Login from "./Login";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="review">
          <Route path="list" element={<Review />} />
          <Route path="create" element={<ReviewCreate />} />
          <Route path=":id">
            <Route path="detail" element={<ReviewDetail />} />
            <Route path="update" element={<ReviewUpdate />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
