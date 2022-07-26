import { useNavigate } from 'react-router-dom';
import axios from "axios";
import url from "../../data/serverUrl.json";
import { useState } from "react";

const SignUp = ({ signUpForm, signUpFunc }) => {

    const navigate = useNavigate();

    const SignUpButton = async () => {
        return await axios.post(url.url + "/user/signUp", signUpForm);
    }

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="album">
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={signUpForm.email} onChange={signUpFunc}
                            className="form-control" id="email" name={"email"} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control"
                            value={signUpForm.password} onChange={signUpFunc} name={"password"} id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rePassword" className="form-label">Re - Password</label>
                        <input type="password" className="form-control" value={signUpForm.rePassword} onChange={signUpFunc}
                            name={"rePassword"} id="rePassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" value={signUpForm.name} onChange={signUpFunc}
                            name={"name"} id="name" />
                    </div>
                    <div className="mb-3">
                        <p className="text-danger">{errorMessage}</p>
                    </div>
                    <button type="button"
                        onClick={() => {
                            SignUpButton().then(res => {
                                console.log(res.data);
                                alert(res.data.result);
                            }).catch(e => {
                                console.log(e);
                                setErrorMessage(e.response.data.error);
                            });
                        }}
                        className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;