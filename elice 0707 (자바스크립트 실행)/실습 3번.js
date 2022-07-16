const AlphabetCounter = {
    sentence: "",
    alphabetMap: {},

    setSentence: function (sentence) {
        this.sentence = sentence;
        return this;
    },

    buildAlphabetMap: function () {
        // this.sentence 로부터 알파벳 맵을 만들어
        // this.alphabetMap에 저장하세요.

        this.alphabetMap = this.sentence
            .trim() //공백 제거
            .toLowerCase() //모든 문자를 소문자로, 반대되는 함수 -> toUpperCase
            .split("") //문자 하나하나를 배열에다가 담습니다.
            // console.log(this.alphabetMap);
            .filter(
                (result) => result >= "a" && result <= "z"
            )
            .reduce((key,value)=>{  // [a:2][b:3]라는 형태로 만들기 위해서 reduce 사용

                // console.log(key,value);

                // console.log(Boolean (key[value]));

                if(!key[value]){key[value] = 0;}
                // 이미 있는 key[value]라면 true 나오게 되고 객체에 존재하지 않으면 false로 나오게 된다.
                // 즉 아직 key값 객체에 key[value]가 존재하지 않으면 key[value]값을 0으로 추가하게된다.
                // console.log(key,value);

                key[value]++;

                return key;

            },{}); // => key 초기에 빈 객체값으로 초기화

        return this;
    },

    buildResult: function () {
        // Object.entries()를 활용하여 [a: 1] [b: 2] 형태의 문자열을 만들어보세요.
        const resultString = Object.entries(this.alphabetMap)
            .reduce((acc, [key, value]) => `${acc} [${key}: ${value}]`, "")
            .trim();

        return `결과는 : ${resultString} 입니다.`;
    },
};

export default AlphabetCounter;
