import axios from "axios";
import { useEffect } from "react";
import url from "./../../../data/port.json";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const KakaoCallBack = () => {

    const navigate = useNavigate();

    const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["auth"]);
    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

    //kakao에서 redirect 해준 code 가져오는 부분
    //2번
    const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        // console.log(KAKAO_PARAMS);

        //3번
        sendCode().then(res => {
            console.log(res.data);

            if (res.data.login) { //true면 로그인 되어있는상태

                setCookie("userData", res.data, { path: "/" });
                navigate("/review/list");

            } else {             //false면 회원가입을 진행해야하는 상태
                setCookie("auth", res.data, { path: "/" });
                navigate("/oauth/signUp");
            }



        }).catch(e => {
            console.log(e);
            navigate("/");
        })

    }, []);

    const sendCode = async () => {
        return await axios.get(url.url + `/auth/kakao`, {
            params: {
                code: KAKAO_PARAMS
            }
        });
    }

}
export default KakaoCallBack;