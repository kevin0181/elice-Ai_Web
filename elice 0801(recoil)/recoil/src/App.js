import filterSelect from './filterSelect' // atom으로 만든 전역상태
import { useRecoilState } from 'recoil' // 훅 import
import { useEffect } from 'react';

function App() {


  const [state, setState] = useRecoilState(filterSelect); // 전역상태를 state로 만듦

  useEffect(() => {
    // console.log(state);/

    let state2 = { ...state };

    state2['weekly-date'] = 123;

    console.log(state2);

  }, [state]);


  return (
    <div className="App">
    </div>
  );
}

export default App;
