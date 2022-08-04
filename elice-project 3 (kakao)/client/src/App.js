import { Route, Routes } from "react-router-dom";

// Component import
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Review from "./Review";
import ReviewCreate from "./ReviewCreate";
import ReviewDetail from "./ReviewDetail";
import ReviewUpdate from "./ReviewUpdate";

//Redux
import Store from "./app/Store";
import { Provider } from "react-redux";

//social
import KakaoCallBack from "./pages/user/kakao/KakaoCallback";
import SocialSignUp from "./pages/user/SocialSignUp";

function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} /> {/* url -> http://localhost:3000/ */}
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />} />
            <Route path="signUp" element={<SocialSignUp />} />
          </Route>
          <Route path="review">
            <Route path="list" element={<Review />} /> {/* url -> http://localhost:3000/review/list */}
            <Route path="create" element={<ReviewCreate />} /> {/* url -> http://localhost:3000/review/create */}
            <Route path=":id">
              <Route path="detail" element={<ReviewDetail />} /> {/* url -> http://localhost:3000/review/:id/detail */}
              <Route path="update" element={<ReviewUpdate />} /> {/* url -> http://localhost:3000/review/:id/update */}
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
