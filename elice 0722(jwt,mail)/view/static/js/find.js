const findPw = () => {
    //패스워드를 찾는 부분
    if (!$('#email').val()) {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return;
    }

    let findForm = $("#findForm").serialize();
    //비밀번호 찾기 : 1번
    //email을 서버에 넘겨줍니다.
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/find/password",
        data: findForm,
        success: (res) => {
            //비밀번호 찾기 : 3번
            console.log(res);
            alert(res.result);
        }, error: (error) => {
            console.log(error);
        }
    })

}