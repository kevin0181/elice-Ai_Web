let shortId;

//postUpdate.html이 로드가 완료가 되면?
$(document).ready(() => {

    //브라우저에 존재하는 localStorage에 getItem을 사용하여 shortId키를 가져옵니다.
    shortId = localStorage.getItem("shortId");

    //현재 게시글의 내용을 가져오기 위해 ajax를 사용하여 데이터를 받아옵니다.
    //shortId를 사용하여 해당 게시글의 title과 content를 가져오기 위해 ajax요청을 합니다.
    //게시글 찾기 : 1번
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/posts/${shortId}/find`,
        success: (res) => {
            //게시글 찾기 : 3번
            //가져온 title과 content를 #title, #content에 해당하는 input 태그에 넣어줍니다.
            $("#title").val(res.title);
            $("#content").val(res.content);
        }
    })
});



//게시글 수정하기 버튼을 클릭하게 되면 아래 이벤트 핸들러가 작동합니다.
const updatePost = () => {

    //------------------------유효성 검사-------------------------------
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
    //--------------------------------------------------------------------

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


