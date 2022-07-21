$(document).ready(() => {
    let noHeader = `<header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <img src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/53925/elice_logo.webp"/>
        </svg>
    </a>
    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/view/index.html" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
    </ul>
    <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2" onclick="location.href='/view/user/login.html'">Login</button>
        <button type="button" class="btn btn-primary" onclick="location.href='/view/user/signUp.html'">Sign-up</button>
    </div>
</header>`;

    let yesHeader = `<header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
<a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
        <img src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/53925/elice_logo.webp"/>
    </svg>
</a>
<ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li><a href="/view/index.html" class="nav-link px-2 link-secondary">Home</a></li>
    <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
    <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
    <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
    <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
</ul>
<div class="col-md-3 text-end">
    <button type="button" class="btn btn-outline-danger me-2" onclick="logout()">LogOut</button>
</div>
</header>`;

    //토큰 값을 가지고 옵니다.
    let status = $.cookie("accessToken");
    console.log(status);

    //만약 토큰이 존재한다면 header부분이 로그아웃 버튼이 나오게 되고.
    if (status) {
        $(".container").prepend(yesHeader);
    } else { //그렇지 않다면 로그인과 회원가입 버튼이 나오게됩니다.
        $(".container").prepend(noHeader);
    }

});

const logout = () => {//로그아웃 함수
    //만약 로그아웃 버튼을 클릭하게 되면 accessToken에 해당하는 값을 지웁니다. (토큰을 삭제)
    $.removeCookie("accessToken", {path: '/'});
    location.href = "/view/user/login.html";
}