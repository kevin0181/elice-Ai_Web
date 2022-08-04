import { useEffect, useState } from "react";
import "./app.css";

function App() {

  const [list, setList] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    console.log(list);
  }, [list]);


  const insertData = () => {
    setText("");
    setList([
      ...list,
      {
        index: Math.floor(Math.random(100000) * 100000),
        text: text,
        status: false
      }
    ]);
  }

  const deleteLine = (index) => {
    const getList = list.filter(it => it.index !== index)
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
      <input type={"button"} value={"버튼"} onClick={insertData} />
      <div className="container">
        <ol>
          {
            list.map((it, index) => (
              <li key={it.index}
                style={{ backgroundColor: 'blue' }}
                className={it.status === true ? "line" : ""}>
                {it.text} &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => {
                  deleteLine(it.index);
                }}>삭제</button>
                <button onClick={() => {
                  successLine(index);
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
