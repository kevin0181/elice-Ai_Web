import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";
import url from "./../../data/port.json";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

    const [createReview, setCreateReview] = useState({
        img: "",
        title: "",
        content: "",
        email: cookies.userData.email
    });

    useEffect(() => {
        console.log(createReview);
    }, [createReview]);

    const onChangeCreateReview = (e) => {
        setCreateReview({
            ...createReview,
            [e.target.name]: e.target.value
        });
    }

    const onClickCreateReviewButton = () => {

        if (createReview.img === "") {
            alert("이미지 경로를 입력해주세요.");
            $("#img").focus();
            return;
        }

        if (createReview.title === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus();
            return;
        }

        if (createReview.content === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return;
        }

        sendCreateReview().then(res => {
            console.log(res);
            alert(res.data.result);
            navigate("/review/list");
        }).catch(e => {
            console.log(e);
        })

    }


    const sendCreateReview = async () => {
        return await axios.post(url.url + "/posts", createReview, {
            headers: {
                accessToken: cookies.userData.accessToken
            }
        });
    }

    return (
        <div className="album">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-img-top" style={{ textAlign: "center" }}>
                        {
                            createReview.img !== "" ? (<img src={createReview.img} alt="movie img" />)
                                : (<></>)
                        }
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Movie Img</h5>
                        <p className="card-text">
                            Img Example
                        </p>
                        <input type="text" className="form-control" name="img" onChange={onChangeCreateReview} id="img" placeholder="사진 URL을 입력해주세요." />
                        <p className="card-text"><small className="text-muted">url...</small></p>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" className="form-control" onChange={onChangeCreateReview} name="title" id="title" placeholder="제목을 입력해주세요." />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea className="form-control" onChange={onChangeCreateReview} name="content" id="content" rows="3"></textarea>
                </div>
                <button type="button" className="btn btn-outline-primary" style={{ marginRight: "2%" }} onClick={onClickCreateReviewButton}>생성</button>
                <button type="button" className="btn btn-outline-danger">뒤로가기</button>
            </div>
        </div>
    )
}
export default Create;