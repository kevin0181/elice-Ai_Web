import { useNavigate } from 'react-router-dom';

import { useCookies } from "react-cookie";
import { useEffect } from "react";

function Header() {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    // useEffect(() => {
    //     if (cookies.tokenData === undefined) { //로그인 안되어있으면 로그인페이지로 리다이렉트
    //         navigate("/");
    //     }
    // }, [cookies]);

    const onClickLogOut = () => {
        removeCookie("tokenData", { path: "/" });
        navigate("/");
    }

    // 카카오 스크립트
    //OAuth.js
    useEffect(() => {
        console.log(new URL(window.location.href));
    }, []);

    const REST_API_KEY = "1cf2f1fcd0eb3df4344ed058e6f7da3e";
    const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <header className="shadow-lg" style={{ position: 'fixed', width: '100%', zIndex: '1' }}>
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">How to use</h4>
                            <p className="text-muted">영화의 리뷰를 추가하고 별점을 넣어 평가를 할 수 있습니다.</p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Cinema</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">네이버 영화</a></li>
                                <li><a href="#" className="text-white">CGV</a></li>
                                <li><a href="#" className="text-white">롯데시네마</a></li>
                                <li><a href="#" className="text-white">메가박스</a></li>
                            </ul>
                            {
                                cookies.tokenData ? (<>
                                    <h4 className="text-white">My Info</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="text-danger" onClick={onClickLogOut}>LogOut</a></li>
                                        <li><a href="#" className="text-primary">Info</a></li>
                                    </ul>
                                </>) : (<>
                                    <h4 className="text-white">My Info</h4>
                                    <ul className="list-unstyled">
                                        <a id="custom-login-btn" href={KAKAO_AUTH_URL}>
                                            <img
                                                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                                                width="222"
                                                alt="카카오 로그인 버튼"
                                            />
                                        </a>
                                        <li><a href="#" className="text-primary" onClick={() => {
                                            navigate("/");
                                        }}>Login</a></li>
                                    </ul>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="#" onClick={() => {
                        navigate("/review/list");
                    }} className="navbar-brand d-flex align-items-center">
                        <strong >Movie Review</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
