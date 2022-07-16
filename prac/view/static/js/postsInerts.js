const insertContent = () => {

    if (!$('#title').val()) {
        alert("제목을 입력해주세요.");
        return;
    }

    if (!$('#content').val()) {
        alert("내용을 입력해주세요.");
        return;
    }

    $("#contentForm").submit();
}