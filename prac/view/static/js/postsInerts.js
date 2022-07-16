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