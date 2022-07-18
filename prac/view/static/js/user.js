const signUp = () => {

    if (!$("#email").val()) {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return;
    }

    if (!$("#password").val()) {
        alert("패스워드를 입력해주세요.");
        $("#password").focus();
        return;
    }

    if (!$("#RePassword").val()) {
        alert("패스워드가 일치하는지 확인해주세요.");
        $("#RePassword").focus();
        return;
    }

    if (!$("#name").val()) {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return;
    }

    if ($("#password").val() !== $("#RePassword").val()) {
        alert("패스워드가 일치하지 않습니다.");
        $("#RePassword").val("");
        $("#RePassword").focus();
        return;
    }

    let formData = $('#signUp-form').serialize();

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/user/signUp',
        data: formData,
        success: (res) => {
            if (res.result === 'signIn-success') {
                alert("회원가입에 성공하였습니다. 재 로그인 해주세요.");
                location.href = "./../user/login.html";
            }
        },
        error: function (error) {
            alert(error.responseText);
            $("#email").val("")
            $("#email").focus();
            $("#password").val("");
            $("#RePassword").val("");
            $("#name").val("");
        }
    });
}


const signIn = () => {

    if (!$("#email").val()) {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return;
    }

    if (!$("#password").val()) {
        alert("패스워드를 입력해주세요.");
        $("#password").focus();
        return;
    }

    let formData = $('#signIn-form').serialize();

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/user/signIn',
        data: formData,
        success: (res) => {
        },
        error: function (error) {
            alert(error.responseText);
            $("#email").val("")
            $("#email").focus();
            $("#password").val("");
        }
    });
}