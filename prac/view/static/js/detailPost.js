$(document).ready(() => {
    let detailData = JSON.parse(localStorage.getItem("detailData"));
    console.log(detailData); //가져올때 파싱해서 가져옵니다.
    if (detailData === null || detailData === undefined) {
        return;
    }

    $("#title").text(detailData.title);
    $("#author").text(detailData.author);
    $("#content").text(detailData.content);
    $("#shortId").text(detailData.shortId);
});