const Clock = {
    getCurrentTime: function (date) { // -> app.js에서 받아오는 date 변수가 Date의 객체;
        // 현재 시간 문자열을 만들어 리턴하세요.
        // date가 Date 객체의 인스턴스가 아니라면 에러 메시지를 리턴하세요.

        if(date instanceof Date && isFinite(date)){
            //isFinite() 함수는 전달된 값이 유한 숫자로 변환할 수 있는지 boolean 값으로 판별합니다.
            //-> Date 객체이지만 String 전달될 수 있는 날짜 객체를 거르기 위해 isFinite 함수를 사용.

            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            return `현재 시간은 ${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초 입니다.`
            //상단에 작성된 문장은 ES6의 문법중 하나로 ${} -> 이것을 템플릿 리터럴 이라고 부릅니다. (ECMAScript)

        }else{

            return "현재 시간을 구할 수 없습니다.";

        }


    },
};

export default Clock;
