import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import url from "./../../data/port.json";
import { useCookies } from "react-cookie";

const Update = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
    const [updateData, setUpdateData] = useState({});

    let getReduxShortId = useSelector(state => state.id.value);

    useEffect(() => {

        findGetReviewData(getReduxShortId).then(res => {
            console.log(res);
            setUpdateData(res.data);
        });

    }, []);

    const findGetReviewData = async (shortId) => {
        return await axios.get(url.url + `/posts/${getReduxShortId}/find`, {
            headers: {
                accessToken: cookies.userData.accessToken
            }
        });
    }

    const onChangeUpdateData = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="album">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-img-top" style={{ textAlign: "center" }}>
                        <img src={updateData.img}
                            alt="movie img" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Movie Img</h5>
                        <p className="card-text">
                            Img Example
                        </p>
                        <input type="text" className="form-control" defaultValue={updateData.img}
                            onChange={onChangeUpdateData} name="img" disabled
                            id="img" placeholder="사진 URL을 입력해주세요." />
                        <p className="card-text"><small className="text-muted">url...</small></p>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" className="form-control" defaultValue={updateData.title}
                        onChange={onChangeUpdateData} name="title"
                        id="title" placeholder="제목을 입력해주세요." />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea className="form-control" name="content" defaultValue={updateData.content}
                        onChange={onChangeUpdateData} id="content"
                        rows="3"></textarea>
                </div>
                <button type="button" className="btn btn-outline-primary" style={{ marginRight: "2%" }}>수정</button>
                <button type="button" onClick={() => {
                    window.history.back();
                }} className="btn btn-outline-danger">뒤로가기</button>
            </div>
        </div>
    )
}

export default Update;