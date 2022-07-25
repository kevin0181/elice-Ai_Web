import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, decrement10 } from './counterSlice'

export function Counter() {
  const count = useSelector(state => state.counter.value) //counter은 이름이다. counterSlice의 4번째줄과 같다.
  const dispatch = useDispatch(); //redux함수를 사용하기위해 가져옴.

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement10())}
        >
          ㅁㄴㅇ
        </button>
      </div>
    </div>
  )
}