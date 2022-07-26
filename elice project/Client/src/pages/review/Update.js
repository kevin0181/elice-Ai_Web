import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import url from "./../../data/serverUrl.json";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Update = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    const [updateReviewData, setUpdateReviewData] = useState({});

    const data = useSelector(state => state.user.value);

    const findUpdateReviewData = async (shortId) => {
        return await axios.get(url.url + `/posts/${shortId}/find`, {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        })
    }

    useEffect(() => { //데이터 가져오기
        findUpdateReviewData(data).then((res) => {
            setUpdateReviewData(res.data);
        })
    }, [])


    const onChangeReview = (e) => {
        setUpdateReviewData({
            ...updateReviewData,
            [e.target.name]: e.target.value
        })
    }

    const onClickUpdateButton = async (shortId) => { //업데이트 전송 버튼
        if (updateReviewData.url === "") {
            alert("이미지에 url을 입력해주세요.");
            $("#url").focus();
            return;
        }

        if (updateReviewData.title === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus();
            return;
        }

        if (updateReviewData.content === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return;
        }

        return await axios.post(url.url + `/posts/${shortId}/update`, updateReviewData, {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        })

    }

    return (
        <div className="album bg-light">
            <div className="container">
                <form>
                    <div className="card mb-3">
                        <div className="card-img-top" style={{ textAlign: 'center' }}>
                            <img src={updateReviewData.url} alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Movie Img</h5>
                            <p className="card-text">Img Example</p>
                            <input type="text" className="form-control" onChange={onChangeReview} id="title" defaultValue={updateReviewData.url} name={"title"} placeholder="Input Img Url" />
                            <p className="card-text"><small className="text-muted">https://search.pstatic.net/common?type=o&size=174x246&q ...</small></p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" onChange={onChangeReview} defaultValue={updateReviewData.title} name={"title"} placeholder="Movie Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea className="form-control" id="content" onChange={onChangeReview} defaultValue={updateReviewData.content} name="content" rows="3"></textarea>
                    </div>
                    <button type="button" className="btn btn-outline-primary m-3" onClick={() => {
                        onClickUpdateButton(updateReviewData.shortId).then(res => {
                            alert(res.data.result);
                            navigate("/review/list");
                        }).catch(e => {
                            console.log(e);
                        });
                    }}>Update</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => {
                        history.back();
                    }}>Back</button>
                </form>
            </div>
        </div>
    );
}

export default Update;