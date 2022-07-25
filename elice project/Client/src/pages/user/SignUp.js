const SignUp = () => {
    return (
        <div className="album">
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name={"email"} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name={"password"} id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Re - Password</label>
                        <input type="password" className="form-control" name={"password"} id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name={"name"} id="name" />
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;