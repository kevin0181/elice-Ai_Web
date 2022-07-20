let shortId;

$(document).ready(() => {
    shortId = localStorage.getItem("shortId");
    console.log(shortId);

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/posts/${shortId}/find`,
        success: (res) => {
            console.log(res);
            $("#title").val(res.title);
            $("#content").val(res.content);
        }
    })
});


const updatePost = () => {

    if (!$("#title").val()) {
        alert("제목을 입력해주세요.");
        $("#title").focus();
        return;
    }

    if (!$("#content").val()) {
        alert("내용을 입력해주세요.");
        $("#content").focus();
        return;
    }

    //form 태그 내의 input들을 자동으로 읽어와 queryString형으로 변경해줌.
    let formData = $("#updateForm").serialize();
    // ?name=name&age=1  => 쿼리스트링

    //게시글 수정 : 1번
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/posts/${shortId}/update`,
        data: formData,
        success: (res) => {
            //게시글 수정 3번
            //json 형태로 응답을 받아 res.result를 통해 data를 받습니다.
            alert(res.result);

            //alert를 실행 한 후 페이지를 list.html로 redirect합니다.
            location.href = "/view/posts/list.html";
            return;
        }
    })
}


