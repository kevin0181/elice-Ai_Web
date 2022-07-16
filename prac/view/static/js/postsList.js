$(document).ready(() => {

    $.ajax({
        methods: "GET",
        url: "http://localhost:8080/posts",
        success: (res) => {
            console.log(res); //값 가져옴
        }
    })

});