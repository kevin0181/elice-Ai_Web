import {
  BrowserRouter,
  Routes,
  Route,
  useResolvedPath,
} from "react-router-dom";
// import your route components too

import Review from "./Review";
import ReviewDetail from "./ReviewDetail";
import ReviewCreate from "./ReviewCreate";
import Header from "./Header";
import Footer from "./Footer";
import ReviewUpdate from "./ReviewUpdate";
import Login from "./Login";

import Store from "./app/Store";
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
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
      </Provider>
    </>
  );
}

export default App;
