import "./index.css"

function App() {

  const MyPracComponent = () => { //jsx 컴포넌트를 사용하는 경우 맨 앞글자 대문자
    return <div>안녕하세요.</div>
  }

  const MyPracJSX = () => { //jsx의 문법입니다.
    const a = 1;
    const b = 2;
    const c = a + b;
    //ES6와 유사하게 HTML태그 내에서 {}리터럴을통해 변수를 넣을 수 있습니다.
    return <div>{a} + {b} = {c}</div>
    // 만약 return 값이  html 태그가 최상위에 두개면 오류를 발생합니다.
    // ex : return <div></div><div></div>
  }

  const MyPracProps = ({ name, age }) => {
    return <>
      <div>안녕하세요. {name}님, {age}입니다.</div>
    </>
  }

  const MyPracProps2 = (props) => {
    console.log(props);
    let { name, color } = props;
    return <>
      <div style={{ color }}>안녕하세요. {name}님</div>
    </>
  }

  return (
    <div className="App">
      {/* JSX에서 마지막 / 닫는 태그는 필수입니다. */}
      <MyPracComponent />
      <MyPracJSX />

      {/* 또한 JSX에서는 모든 프로퍼티 이름을 camelCase로 작성합니다.
      ex => className */}

      {/* JSX는 class -> className, style={{css}} 를 사용합니다. */}

      {/*style태그에서 첫번째 {}는 javascript를 사용하기 위해 열어주고
       두번째 {}는 style 작성을 위해 열어줍니다. */}

      <div className={"welcome"} style={{ color: 'yellow' }}>
        반갑습니다.
      </div>
      <MyPracProps name={"재석"} age={"25"} />
      <MyPracProps2 name={"명수"} color="red" />
    </div>
  );
}

export default App;
