const signUp = () => { //회원 가입 버튼을 클릭하면?

    //--------------------유효성 검사------------------------
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

    if (!$('#rePassword').val()) {
        alert("비밀번호 확인을 입력해주세요.");
        $("#rePassword").focus();
        return;
    }

    if (!$('#name').val()) {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return;
    }

    if ($("#password").val() !== $("#rePassword").val()) { //비밀번호와 비밀번호 확인이 일치하는지 확인
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        $("#password").val("");
        $("#rePassword").val("");
        $("#password").focus();
        return;
    }

    //-------------------------------------------------------


    //회원가입 form 가지고옴
    let signUpData = $("#signUpForm").serialize();

    //회원가입 : 1번
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/signUp",
        data: signUpData,
        success: (res) => {
            //회원가입 : 3번
            alert(res.result); //응답처리
            location.href = "/view/user/login.html"; //로그인 페이지로 이동
        }, error: (err) => {
            //만약 이미 가입된 이메일이라면?
            alert(err.responseJSON.error);
            //모든 input 값들을 비워준다.
            $("#email").val("");
            $("#password").val("");
            $("#rePassword").val("");
            $("#name").val("");
            $("#email").focus(); //email에 focus를 준다.
        }
    });

}