import { useEffect, useState } from "react";
import "./index.css";

function App() {

  const [list, setList] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    console.log(list);
  }, [list]);

  const insertData = () => {
    setText("");
    setList(
      [
        ...list,
        {
          index: list.length,
          text: text,
          status: false
        }
      ]
    )
  }

  const deleteLine = (index) => {
    const getList = list.filter((it) => it.index !== index);
    setList(getList);
  }

  const successLine = (index) => {
    const getList = [...list];
    getList[index].status = true;
    setList(getList);
  }

  return (
    <div className="App">
      <input type={"text"} value={text} onChange={(e) => {
        setText(e.target.value);
      }} />
      <input type={"button"} onClick={insertData} value="버튼" />
      <div id="container">
        <ol>
          {
            list.map(it => (
              <li key={it.index} className={it.status === true ? "complete" : ""}>
                {it.text} &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => {
                  deleteLine(it.index)
                }}>삭제</button>
                <button onClick={() => {
                  successLine(it.index)
                }}>완료</button>
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
}

export default App;
