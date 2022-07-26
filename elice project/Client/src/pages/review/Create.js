import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import url from "./../../data/serverUrl.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    const [review, setReview] = useState({
        title: "",
        content: "",
        url: "",
        email: cookies.tokenData.email
    });

    // useEffect(() => {
    //     console.log(review);
    // }, [review]);

    const onChangeReview = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const onClickCreateButton = async () => {
        if (review.url === "") {
            alert("이미지에 url을 입력해주세요.");
            $("#url").focus();
            return;
        }

        if (review.title === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus();
            return;
        }

        if (review.content === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return;
        }

        return await axios.post(url.url + "/posts", review, {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        })

    }

    const onClickBackButton = () => { //뒤로가기 버튼
        history.back();
    }

    return (
        <div className="album bg-light">
            <div className="container">
                <form>
                    <div className="card mb-3">
                        <div className="card-img-top" style={{ textAlign: 'center' }}>
                            <img src="https://search.pstatic.net/common?type=o&size=174x246&quality=100&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20220720_283%2F1658284839003UzxoT_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Movie Img</h5>
                            <p className="card-text">Img Example</p>
                            <input type="text" className="form-control"
                                onChange={onChangeReview} id="url" name={"url"} placeholder="Input Img Url" />
                            <p className="card-text"><small className="text-muted">https://search.pstatic.net/common?type=o&size=174x246&q ...</small></p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control"
                            onChange={onChangeReview} id="title" name={"title"} placeholder="Movie Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea className="form-control"
                            onChange={onChangeReview} id="content" name="content" rows="3"></textarea>
                    </div>
                    <button type="button"
                        onClick={() => {
                            onClickCreateButton().then((res) => {
                                alert(res.data.result);
                                navigate("/review/list");
                            }).catch(e => {
                                console.log(e);
                            });
                        }}
                        className="btn btn-outline-primary m-3">Create</button>
                    <button type="button" className="btn btn-outline-danger" onClick={onClickBackButton}>Back</button>
                </form>
            </div>
        </div>
    );
}

export default Create;