$("#btn").click(() => {
    let value = $("#content-input").val();

    let list = `<li>${value} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button onclick="deleteLine(this)">삭제</button>
    <button onclick="successLine(this)">완료</button></li><br/>`;

    $("#content").append(list);
})

const deleteLine = (data) => {

}


const successLine = (data) => {
    $(data).parents("li").addClass("line");
}