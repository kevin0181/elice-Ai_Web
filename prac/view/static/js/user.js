const signIn = () => {

    if (!$("#email").val()) {
        alert("이메일을 입력해주세요.");
        return;
    }

    if (!$("#password").val()) {
        alert("패스워드를 입력해주세요.");
        return;
    }

    if (!$("#name").val()) {
        alert("이름을 입력해주세요.");
        return;
    }


    let formData = $('#signIn-form').serialize();

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/user/sign',
        data: formData,
        success: (res) => {
            if (res.result === 'signIn-success') {
                console.log(res);
            }
        }
    });
}