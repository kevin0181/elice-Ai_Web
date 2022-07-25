const Login = ({ loginForm, loginFunc }) => {
    return (
        <div className="album">
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={loginForm.email}
                            onChange={loginFunc} className="form-control" id="email" name={"email"} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={loginForm.password}
                            onChange={loginFunc} className="form-control" name={"password"} id="password" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="idCheck" />
                        <label className="form-check-label" htmlFor="idCheck">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;