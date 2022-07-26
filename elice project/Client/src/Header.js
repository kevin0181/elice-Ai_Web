import { useEffect, useState } from "react";
import { getCookie } from "./util/cookie/cookie";

function Header() {

    const [loginCheck, setLoginCheck] = useState();

    useEffect(() => {
        console.log(getCookie("tokenData"));
    },[]);

    return (
        <header className="shadow-lg" style={{ position: 'fixed', width: '100%', zIndex: '1' }}>
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">How to use</h4>
                            <p className="text-muted">영화의 리뷰를 추가하고 별점을 넣어 평가를 할 수 있습니다.</p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Cinema</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">네이버 영화</a></li>
                                <li><a href="#" className="text-white">CGV</a></li>
                                <li><a href="#" className="text-white">롯데시네마</a></li>
                                <li><a href="#" className="text-white">메가박스</a></li>
                            </ul>
                            {
                                loginCheck ? (<>
                                    <h4 className="text-white">My Info</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="text-danger">LogOut</a></li>
                                        <li><a href="#" className="text-primary">Info</a></li>
                                    </ul>
                                </>) : (<>
                                    <h4 className="text-white">My Info</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="text-primary">Login</a></li>
                                    </ul>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong>Movie Review</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
