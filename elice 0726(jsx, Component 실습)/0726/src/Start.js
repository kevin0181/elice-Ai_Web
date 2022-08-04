import { useState } from "react"
import LoginButton from "./LoginButton"

const Start = () => {

    const [status, setStatus] = useState(false);

    const InComponent = () => {
        return (<div>반갑습니다.</div>)
    }

    const buttonClick = () => {
        setStatus(true);
    }

    const MyPracProps = ({ name, age }) => {
        return (
            <div>{name}님 안녕하세요. {age}입니다.</div>
        )
    }

    const MyPracProps2 = (props) => {
        console.log(props);
        let { name, age } = props;
        return (
            <div>{name}님 안녕하세요. {age}입니다.</div>
        )
    }

    return (
        <div>
            안녕하세요.
            <InComponent />
            {
                status ? (<></>) : (<>
                    <LoginButton data={buttonClick} />
                </>)
            }
            <MyPracProps name={"이름"} age={24} />
            <MyPracProps2 name={"이름2"} age={29} />
        </div>
    )
}

export default Start;