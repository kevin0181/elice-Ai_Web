import { findUserByUsername, findAddressByUserId } from "./api";

const UserInput = () => {
  let value = "";
  let error = "";

  function getValue() {
    return value;
  }

  function getError() {
    return error;
  }

  function setValue(inputValue) {
    value = inputValue;
  }
  
  // 지시사항을 참고하여 searchAddress() 함수를 구현하세요.
  function searchAddress() {

    error = "";

  return  findUserByUsername(value)
                        .then((user)=>{
                            console.log(user);
                            return findAddressByUserId(user.id);
                        })
                        .then((address)=>{
                            console.log(address);
                            return address;
                        })
                        .catch((e)=>{
                            error = e.message;
                        });
  }

  return { getError, getValue, setValue, searchAddress };
};

export default UserInput;












// GET방식으로 https://comic.naver.com/search?keyword=whtjr -> 해당되는 요청이 들어왔어
// 이 요청에대한 응답으로 네이버 웹툰 검색 결과 페이지를 내보내줘,


