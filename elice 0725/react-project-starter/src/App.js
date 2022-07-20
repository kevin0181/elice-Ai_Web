import { useEffect, useState } from "react";

function App() {

  const [list1, setList1] = useState([{
    index: 0,
    text: ""
  }]);

  const [text, setText] = useState("");

  useEffect(() => {
    console.log(list1);
  }, [list1]);

  const insertData = () => {
    setList1(
      text
    )
  }

  return (
    <div className="App">
      <input type={"text"} onChange={(e) => {
        setText(e.target.value);
      }} />
      <input type={"button"} onClick={insertData} value="버튼" />
      <div id="container">
        <ol>
          {
            list1.map(it => (
              <></>
            ))
          }
        </ol>
      </div>
    </div>
  );
}

export default App;
