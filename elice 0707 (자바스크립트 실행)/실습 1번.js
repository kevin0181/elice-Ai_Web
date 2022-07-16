const TwoDotDistance = {
    point1: {
        x: 0,
        y: 0,
    },

    point2: {
        x: 0,
        y: 0,
    },

    setPoints: function (x1, y1, x2, y2) {
        // point1, point2의 값을 세팅합니다.
        this.point1 = {x : x1, y : y1};
        this.point2 = {x : x2, y : y2};
        return;
    },

    calculateDistance: function () {
        // 두 점 사이의 거리를 구해, 소숫점 두자리까지 계산하고 문자열을 리턴합니다.
        // 결과가 NaN 이라면, 숫자 0을 문자열로 리턴합니다.

        // -> 좌표 평면에서 x,y 값이 있으면 두점 사이의 거리를 구하는 공식 => √(x1-x2)²+(y1-y2)²
        // -> 숫자의 제곱근을 반환하는 함수 => Math.sqrt
        // -> a라는 변수에 b라는 변수 크기만큼 제곱한 값을 반환하는 함수 => pow

        let a = Math.sqrt(
            Math.pow(this.point1.x - this.point2.x, 2)
            +
            Math.pow(this.point1.y - this.point2.y, 2)
        );

        if (a === NaN) {
            return "0";
        }
        else {
            return a.toFixed(2);
        }

    },
};

export default TwoDotDistance;
