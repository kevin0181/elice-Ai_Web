const login = () => { //로그인 버튼을 클릭하면?

    // ----------------------유효성 검사-------------------------
    if (!$('#email').val()) {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return;
    }

    if (!$('#password').val()) {
        alert("비밀번호를 입력해주세요.");
        $("#password").focus();
        return;
    }

    // ---------------------------------------------------------

    let loginForm = $("#loginForm").serialize();


    // 로그인 : 1번
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/login",
        data: loginForm,
        success: (res) => {

            //로그인 : 3번
            console.log(res);

            //백엔드 즉, 서버에서 정상적으로 응답을 받았다면 토큰값을 쿠키에 보관합니다.
            $.cookie("accessToken", res.accessToken, {expires: 1, path: '/'});

            //email과 name을 sessionStorage에 저장합니다.
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("name", res.name);

            //로그인 완료 알림
            alert("로그인이 완료되었습니다!");

            //페이지 전환
            location.href = "/view/posts/list.html";

        }, error: (error) => {
            console.log(error);
        }
    })
}