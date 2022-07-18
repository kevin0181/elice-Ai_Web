//쿠키 저장
// expiredays 는 일자 정수 - 365년 1년 쿠키
function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

//쿠키 삭제
//쿠키는 삭제가 없어서 현재 시각으로 만료 처리를 함.
function delCookie(key) {
    let todayDate = new Date();
    document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString() + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}

// 쿠키 읽기
function getCookie(key) {
    key = new RegExp(key + '=([^;]*)'); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
    return key.test(document.cookie) ? unescape(RegExp.$1) : ''; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
}

//쿠키 체크 - 있으면 true 없으면 false
//getCookie() 에 의존
function boolCheckCookie(key) {
    return getCookie(key) != '' ? true : false;
}