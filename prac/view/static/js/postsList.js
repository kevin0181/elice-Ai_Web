$(document).ready(() => {

    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts",
        success: (res) => {
            console.log(res); //값 가져옴
            res.map((it, index) => {

                let listData = `<tr>
                <th scope="row">${index+1}</th>
                <td>${it.title}</td>
                <td>elice</td>
                <td>
                <button type="button" class="btn btn-outline-danger">삭제</button>
                <button type="button" class="btn btn-outline-info">수정</button>
                </td>
                </tr>`

                console.log(listData);


                $(".postsList").append(listData);
            })
        }
    })

});