import { useEffect, useRef, useState } from "react"
import $ from "jquery";

function App() {

  // const [data, setData] = useState({
  //   email: "",
  //   password: "",
  //   name: ""
  // });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const onChangeData = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const [status, setStatus] = useState(false);

  useEffect(() => {

  });


  const eventButton = () => {
    setStatus(!status);
  }

  const PracComponent = ({ eb }) => {
    return (
      <div>
        <button onClick={eb}>버튼</button>
      </div>
    )
  }

  const refInput = useRef();

  return (
    <div className="App">
      {/* <input type="text" value={data.email} onChange={onChangeData} name="email" /> 이메일
      <br />
      <input type="text" value={data.password} onChange={onChangeData} name="password" /> 패스워드
      <br />
      <input type="text" value={data.name} onChange={onChangeData} name="name" /> 이름
      <br />
      <br />
      <br />
      <div>
        <p>이메일 : {data.email}</p>
        <p>패스워드 : {data.password}</p>
        <p>이름 : {data.name}</p>
      </div> */}
      <div>
        {
          status ? (<p>안녕하세요.</p>) : (<></>)
        }
      </div>
      <PracComponent eb={eventButton} />

      <div>
        <input type={"text"} ref={refInput} id="input1"></input>
      </div>

    </div>
  );
}

export default App;
