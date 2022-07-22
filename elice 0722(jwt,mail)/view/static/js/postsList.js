$(document).ready(() => {

    getList();

});

const getList = () => {

    $(".postsList").empty(); //.postsList 클래스 내부에 있는 html들 삭제

    //게시글 리스트 : 1번
    //list.html이 실행 되어 준비가 되는 순간 익명함수가 실행되어,
    //하단의 ajax가 실행됩니다.
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/posts/',
        headers: {
            accessToken: $.cookie("accessToken")
        },
        success: (res) => {
            console.log(res)
            //게시글 리스트 : 3번
            //응답받은 json 형태의 data를 배열이므로 map 함수를,
            //사용하여 listData에 html태그를 담습니다.
            res.map((it, index) => {
                let listData;
                if (sessionStorage.getItem("email") == it.author.email) { //만약에 자기 게시글이면 버튼이 보이고.
                    listData = `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${it.title}</td>
                    <td>${it.author.name}</td>
                    <td>
                        <button type="button" onclick="deletePost('${it.shortId}')" class="btn btn-outline-danger">delete</button>
                        <button type="button" onclick="updatePost('${it.shortId}')" class="btn btn-outline-warning">update</button>
                    </td>
                    </tr>`;
                } else { //자기 게시글이 아니면 버튼이 안보이고.
                    listData = `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${it.title}</td>
                    <td>${it.author.name}</td>
                    <td>
                    </td>
                    </tr>`;
                }

                //listData에 데이터를 담아준 후, postsList라는 클래스에
                //append를 해줍니다.
                $(".postsList").append(listData);
            })
        },
        error: (res) => {
            console.log(res);
            alert(res.responseJSON.message);
            location.href = "/view/user/login.html";
        }
    });
}

//삭제 버튼을 클릭하게 되면?
const deletePost = (shortId) => {

    //가져온 shortId를 ajax로 사용하여 서버에 넘겨줍니다.

    //게시글 삭제 : 1번
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/posts/${shortId}/delete`,
        headers: {
            accessToken: $.cookie("accessToken")
        },
        success: (res) => {

            //게시글 삭제 : 3번
            alert(res.result);
            getList();
        }
    });
}

//업데이트 버튼을 클릭하게 되면?
const updatePost = (shortId) => {

    //브라우저에 localStorage의 setItem을 사용하여 해당 게시글의 shortId를 저장합니다.
    window.localStorage.setItem("shortId", shortId);

    //페이지 이동 -> updateEdit.html로 이동합니다.
    location.href = "/view/posts/updateEdit.html";

}