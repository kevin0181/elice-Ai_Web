const login = () => {
    
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

    let loginForm = $("#loginForm").serialize();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/login",
        data: loginForm,
        success: (res) => {
            console.log(res);

            $.cookie("accessToken", res.accessToken, { expires: 1, path: '/' });
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("name", res.name);

            alert("로그인이 완료되었습니다!");

            location.href = "/view/posts/list.html";

        }, error: (error) => {
            console.log(error);
        }
    })
}