const wait = (ms) => {
    return new Promise((resolve, reject) => {
      // setTimeout을 사용하여, ms를 기다리도록 구현해보세요.
  
      setTimeout(()=>{
          resolve();
      },ms);
  
    });
  };
  
  export default wait;