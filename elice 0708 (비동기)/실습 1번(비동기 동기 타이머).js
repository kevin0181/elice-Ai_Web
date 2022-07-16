const Counter = {
  count: 0,

  getCount: function () {
    return this.count;
  },

  resetCount: function () {
    this.count = 0;
  },

  incrementSync: function () {
    // 동기적으로 3초 뒤에 this.count를 증가하세요.
    // while 문 안에서, 또 다른 Date.now()를 구하여 3000을 초과하는 순간
    // while 문을 벗어나게 구현하세요.
    const currentTime = Date.now();

    while (true) {
      const now = Date.now();
      console.log(currentTime, now); // wile 문으로 인해 3000차이가 날때까지 콘솔이 찍힘.
      if (now - currentTime > 3000) break; // 3000ms가 차이가 나는 순간 break;
    }

    this.count++; // -> 그 후 카운트 증가
  },

  incrementAsync: function (callback) {
    // 비동기적으로 3초 뒤에 this.count를 증가하며 callback을 호출하도록 구현하세요.
    // setTimeout을 활용하세요.
    
    setTimeout(() => { //setTimeout을 활용함에 따라 비동기적 코드를 작성함.
      this.count++;
      callback();
    }, 3000);

//  const currentTime = Date.now(); //이러한 형태도 동기적 으로 작동
//     while (true) {
//       const now = Date.now();
//       console.log(currentTime, now);
//       if (now - currentTime > 3000){
//           this.count++;
//           callback();
//           break;
//       }
//     }

  },
};

export default Counter;