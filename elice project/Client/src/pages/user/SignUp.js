const SignUp = ({ signUpForm, signUpFunc }) => {
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
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;