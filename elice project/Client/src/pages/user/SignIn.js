import axios from "axios";
import url from "../../data/serverUrl.json";
import { useState } from "react";
import { setCookie, getCookie } from "./../../util/cookie/cookie";
import { useNavigate } from 'react-router-dom';
import $ from "jquery";

const SignIn = ({ loginForm, loginFunc }) => {

    const navigate = useNavigate();

    const SignInButton = async () => {

        if (loginForm.email === "") {
            alert("이메일을 입력해주세요.");
            $("#email").focus();
            return;
        }

        if (loginForm.password === "") {
            alert("비밀번호를 입력해주세요.");
            $("#password").focus();
            return;
        }

        return await axios.post(url.url + "/user/login", loginForm);
    }

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="album">
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={loginForm.email}
                            onChange={loginFunc} className="form-control" id="email" name={"email"} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={loginForm.password}
                            onChange={loginFunc} className="form-control" name={"password"} id="password" />
                    </div>
                    <div className="mb-3">
                        <p className="text-danger">{errorMessage}</p>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="idCheck" />
                        <label className="form-check-label" htmlFor="idCheck">Remember Me</label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        SignInButton().then((res) => {
                            setCookie("tokenData", res.data, { path: "/" });
                            alert("로그인 되었습니다.");
                            navigate("/review/list");
                        }).catch((e) => {
                            setErrorMessage(e.response.data.fail);
                        })
                    }}
                    >Login</button>
                </form>
            </div>
        </div >
    );
}

export default SignIn;