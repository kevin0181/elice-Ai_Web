import { useEffect, useState } from "react";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";

function Login() {

  const [view, setView] = useState({
    login: false,
    signUp: false
  });

  //props를 사용해서 구현.
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  //props를 사용해서 구현.
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: ""
  });

  const loginFunc = (e) => { //email과 패스워드 값을 받아오는 부분
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const signUpFunc = (e) => { //회원가입 폼의 데이터를 받아오는 부분
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value
    })
  }

  // useEffect(() => { //useSate값이 변경되었을때마다 감지.
  //   console.log(signUpForm);
  //   // console.log(loginForm);
  // }, [signUpForm, loginForm]);

  return (
    <div>
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Movie</h1>
              <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br /> 또한 삭제 수정이 가능합니다.</p>
              <p>
                <button onClick={() => {
                  setView({
                    login: true,
                    signUp: false
                  });
                }} className="btn btn-primary my-2 m-1">로그인</button>
                <button onClick={() => {
                  setView({
                    login: false,
                    signUp: true
                  });
                }} className="btn btn-secondary my-2 m-1">회원가입</button>
              </p>
            </div>
          </div>
        </section>
        <>
          {
            view.login ? (<SignIn loginForm={loginForm} loginFunc={loginFunc} />) : (<></>)
          }
        </>
        <>
          {
            view.signUp ? (<SignUp signUpForm={signUpForm} signUpFunc={signUpFunc} />) : (<></>)
          }
        </>
      </main>
    </div>
  );
}

export default Login;
