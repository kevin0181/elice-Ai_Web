import axios from "axios";
import { useEffect } from "react";
import url from "./../../data/serverUrl.json";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Social = () => {

    const navigate = useNavigate();

    const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["kakaoAuth"]);
    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    //요청한 카카오 토큰 가져오는 부분
    const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        axios.get(url.url + `/auth/kakao/callback/node`, {
            params: {
                clientId: KAKAO_PARAMS
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                // if (res.data.loginStatus) { //이미 회원가입 되어있음.

                //     // pathll(res.data, { path: '/' }, setCookie, "tokenData").then(() => {
                //     //     navigate("/review/list");
                //     // })

                //     setCookie("tokenData", res.data, { path: '/' });
                //     navigate("/review/list");
                // } else { //안되어있음.

                // pathll(res.data, { path: '/auth/SignUp' }, setCookieAuth, "kakaoAuth").then(() => {
                //     navigate("/auth/SignUp");
                // })

                setCookieAuth("kakaoAuth", res.data, { path: '/auth/SignUp' });
                navigate("/auth/SignUp");
                // }
            } else {
                navigate("/");
            }
        }).catch(e => {
            console.log(e);
            navigate('/');
        });

    }, []);

    const pathll = async (data, path, cookieFuc, cookieName) => {

        return await cookieFuc(cookieName, data, path);

    }

    //------------------------------------------------------------------------------

    // const [cookies, setCookie, removeCookie] = useCookies(["kakaoToken"]);

    // const REST_API_KEY = "1cf2f1fcd0eb3df4344ed058e6f7da3e";
    // const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

    // //요청한 카카오 토큰 가져오는 부분
    // const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

    // //사용자 토큰 가져오기
    // const requestKakao = async () => {
    //     return await axios.
    //         post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_PARAMS}`,
    //             {
    //                 headers: {
    //                     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //                 }
    //             })
    // }


    // //사용자 정보가져옴
    // const getKakaoUserInfo = async (res) => {
    //     return await axios.get(`https://kauth.kakao.com/v2/user/me`, {
    //         headers: {
    //             'Authorization': `Bearer ${res.data.access_token}`,
    //             'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //         }
    //     })
    // }

    // useEffect(() => {
    //     requestKakao().then(res => {
    //         console.log(res);
    //         if (res.status === 200) {
    //             getKakaoUserInfo(res).then(res => {
    //                 console.log(res);
    //             })
    //         }
    //     });
    // }, []);

    // return (
    //     <div>
    //         <p>로그인중</p>
    //     </div>
    // )

}

export default Social;