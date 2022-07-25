const SignUp = () => {
    return (
        <div className="album bg-light">
            <div className="container">
                <form>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name={"email"} aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" name={"password"} id="password" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Re - Password</label>
                        <input type="password" class="form-control" name={"password"} id="password" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" name={"name"} id="name" />
                    </div>
                    <button type="submit" class="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;