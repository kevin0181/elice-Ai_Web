$(document).ready(() => {

    //게시글 리스트 : 1번
    //list.html이 실행 되어 준비가 되는 순간 익명함수가 실행되어,
    //하단의 ajax가 실행됩니다.
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/posts/',
        success: (res) => {
            console.log(res)
            //게시글 리스트 : 3번
            //응답받은 json 형태의 data를 배열이므로 map 함수를,
            //사용하여 listData에 html태그를 담습니다.
            res.map((it, index) => {
                let listData = `<tr>
                <th scope="row">${index + 1}</th>
                <td>${it.title}</td>
                <td>elice</td>
                <td>
                    <button type="button" class="btn btn-outline-danger">delete</button>
                    <button type="button" class="btn btn-outline-warning">update</button>
                </td>
                </tr>`;
                //listData에 데이터를 담아준 후, postsList라는 클래스에
                //append를 해줍니다.
                $(".postsList").append(listData);
            })
        }
    });

})