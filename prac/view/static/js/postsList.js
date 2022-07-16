let listData;


$(document).ready(() => {
    getList();
});

const getList = () => {
    listData = {};
    $(".postsList").empty();
    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts",
        success: (res) => {
            //console.log(res); //값 가져옴
            listData = res;
            listData.map((it, index) => {
                //map을 통해 listData에 html태그를 넣어준다.
                let list = `<tr>
                <th scope="row">${index + 1}</th>
                <td onclick="detailPost('${it.shortId}')">${it.title}</td>
                <td>${it.author}</td>
                <td>
                <button type="button" class="btn btn-outline-danger" onclick="deleteContent('${it.shortId}')">삭제</button>
                <button type="button" class="btn btn-outline-info" onclick="changeContent('${it.shortId}')">수정</button>
                </td>
                </tr>`
                //생성된 html을 .postsList 클래스에 append 해준다.
                $(".postsList").append(list);
            });
        }
    });
}

const detailPost = (shortId) => {
    let detailData = listData.filter((it) => it.shortId === shortId); //해당하는 아이디 찾고
    window.localStorage.setItem("detailData", JSON.stringify(detailData[0]));
    location.href = "./../posts/detailPost.html";
}


const deleteContent = (shortId) => {
    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts/delete/" + shortId,
        success: (res) => {
            if (res.result === 'delete-success') {
                getList();
                return;
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
}

const changeContent = (shortId) => {
    let changeData = listData.filter((it) => it.shortId === shortId); //해당하는 아이디 찾고

    //그 값을 로컬 스토리지에 저장합니다. //또한 로컬스토리지는 String 형태로 저장되기 때문에 JSON의 String형태로 저장합니다.
    window.localStorage.setItem("changeData", JSON.stringify(changeData[0]));
    location.href = "./../posts/createOrEdit.html";
}