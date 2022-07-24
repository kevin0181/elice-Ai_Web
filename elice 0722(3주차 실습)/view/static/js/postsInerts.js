$(document).ready(() => {
    let changeData = JSON.parse(localStorage.getItem("changeData"));
    console.log(changeData); //가져올때 파싱해서 가져옵니다.
    if (changeData === null || changeData === undefined) {
        return;
    }

    $("#title").val(changeData.title);
    $("#author").val(changeData.author);
    $("#content").val(changeData.content);
    $("#shortId").val(changeData.shortId);
});

const insertContent = () => {

    if (!$('#title').val()) {
        alert("제목을 입력해주세요.");
        return;
    }

    if (!$('#content').val()) {
        alert("내용을 입력해주세요.");
        return;
    }

    let formData = $('#contentForm').serialize(); //serialize는 form 태그내의 항목들을 자동으로 읽어와 queryString형으로 변경해준다.
    formData += '&shortId=' + sessionStorage.getItem("shortId"); //shortid값을 추가해서 가져옵니다.
    if ($("#shortId").val()) { //만약 아이디 값이 있으면 수정으로 변경

        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/posts/' + $("#shortId").val(),
            data: formData,
            success: (res) => {
                if (res.result === 'update-success') {
                    location.href = "./../posts/list.html";
                }
            }
        });

        return;
    }

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/posts/',
        data: formData,
        success: (res) => {
            if (res.result === 'save-success') {
                location.href = "./../posts/list.html";
            }
        }
    })
}
