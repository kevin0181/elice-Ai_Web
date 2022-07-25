import { useState } from "react";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";

function App() {

  const [view, setView] = useState({
    login: false,
    signUp: false
  });

  return (
    <div className="App">
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Movie</h1>
              <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br /> 또한 삭제 수정이 가능합니다.</p>
              <p>
                <a href="#" onClick={() => {
                  setView({
                    login: true,
                    signUp: false
                  });
                }} className="btn btn-primary my-2 m-1">로그인</a>
                <a href="#" onClick={() => {
                  setView({
                    login: false,
                    signUp: true
                  });
                }} className="btn btn-secondary my-2 m-1">회원가입</a>
              </p>
            </div>
          </div>
        </section>
        <>
          {
            view.login ? (<Login />) : (<></>)
          }
        </>
        <>
          {
            view.signUp ? (<SignUp />) : (<></>)
          }
        </>
      </main>
    </div>
  );
}

export default App;
