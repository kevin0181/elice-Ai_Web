import "./app.css";

const Form = () => {
  const form = document.getElementById("input-form");
  const button = document.getElementById("form-button");
  const result = document.getElementById("result-text");

  button.addEventListener("click", (e) => {
    const formData = formDataToObject(new FormData(form));
    //console.log(formData); //-> form의 데이터를 받아옴
    //formData 정보를 이용해 복리를 계산하세요.
    // 적절하게 변환하여, 결과 텍스트를 출력하세요.
    const {principal,rate,year,frequency} = parseUserInputs(formData);
    //console.log(principal,rate,year,frequency); // -> 변수 하나하나에 값을 넣어줌
    const amount = calculateCompoundInterest(principal, rate, year, frequency);
    //console.log(amount); //복리 계산 된 최종 금액
    result.innerText = getResultText(principal, rate, year, frequency, amount);
  });

  result.innerText = "";
};


function parseRateText(rate) {
  return `${(rate * 100).toFixed(2)}%`; // 퍼센트 계산, 소수점 2번째까지
}

function parseMoneyText(principal) {
  return principal.toLocaleString("ko-KR"); //toLocaleString을 사용해서 가격에 ,를 넣어줌
}

function parseFrequencyText(frequency) { //frequency는 숫자이므로 숫자에 따라 return 되는 값이 다름
  return {
    1: "연별",
    2: "반기별",
    4: "분기별",
    12: "월별",
  }[frequency];
}

function getResultText(principal, rate, year, frequency, amount) { //사용자에게 text를 보여주는 함수
  principal = parseMoneyText(principal);
  frequency = parseFrequencyText(frequency);
  rate = parseRateText(rate);
  amount = parseMoneyText(amount);
  return `예금액 ${principal}원 기준\n${year}년 후\n${frequency} ${rate}의 복리 계산시\n최종 잔고는\n${amount}원 입니다.`;
}

function calculateCompoundInterest(principal, rate, year, frequency) { // 복리 이자율 계산 함수
  const result = principal * Math.pow(1 + rate / frequency, frequency * year); // 복리 계산식을 사용하여 제곱한다.
  return Math.floor(result); //소수점을 버림.
}

function parseUserInputs(formData) { //입력 값을 Number와 소수점 자리 등으로 변경
  const { principal, rate, year, frequency } = formData;

  return {
    principal: Number(principal.toFixed(2)),
    rate: Number((rate / 100).toFixed(2)),
    year: Number(year),
    frequency: Number(frequency),
  };
}

const app = () => {
  Form();
};

module.exports = app;

function formDataToObject(formData) {
  return Array.from(formData.entries()).reduce(
    (acc, [k, v]) => ((acc[k] = Number(v)), acc),
    {}
  );
}
