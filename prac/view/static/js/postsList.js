$(document).ready(() => {

    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts",
        success: (res) => {
            console.log(res); //값 가져옴
            let listData;
            res.map((it, index) => {

                //map을 통해 listData에 html태그를 넣어준다.
                listData += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${it.title}</td>
                <td>${it.author}</td>
                <td>
                <button type="button" class="btn btn-outline-danger">삭제</button>
                <button type="button" class="btn btn-outline-info">수정</button>
                </td>
                </tr>`

            });
            //생성된 html을 .postsList 클래스에 append 해준다.
            $(".postsList").append(listData);
        }
    })

});