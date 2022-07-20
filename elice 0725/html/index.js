$("#btn").click(() => {
    let value = $("#content-input").val();

    let list = `<li>${value} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button>삭제</button>
    <button>완료</button></li>`;

    $("#content").append(list);
})