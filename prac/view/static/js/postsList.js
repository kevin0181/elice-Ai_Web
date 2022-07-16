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
                <td>${it.title}</td>
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


const deleteContent = (data) => {
    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts/delete/" + data,
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

const changeContent = (data) => {
    console.log(data);
}