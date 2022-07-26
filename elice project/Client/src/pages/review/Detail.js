import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import url from "./../../data/serverUrl.json";
import { useCookies } from 'react-cookie';

const Detail = () => {

    const params = useParams();

    const [detailReviewData, setDetailReviewData] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    // useEffect(() => { //파라미터의 id값을 가져옴
    //     console.log(params);
    // }, [params]);

    const findDetailReviewData = async (shortId) => {
        return await axios.get(url.url + `/posts/${shortId}/find`, {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        })
    }

    useEffect(() => { //데이터 가져오기
        findDetailReviewData(params.id).then((res) => {
            setDetailReviewData(res.data);
        })
    }, [])

    return (
        <div className="album bg-light">
            <div className="container">
                <form>
                    <div className="card mb-3">
                        <div className="card-img-top" style={{ textAlign: 'center' }}>
                            <img src={detailReviewData.url} alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Movie Img</h5>
                            <p className="card-text"><small className="text-muted">{detailReviewData.url}</small></p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <div className="card">
                            <p className="card-body">
                                {detailReviewData.title}
                            </p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <div className="card">
                            <p className="card-body">
                                {detailReviewData.content}
                            </p>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-danger" onClick={() => {
                        history.back();
                    }}>Back</button>
                </form>
            </div>
        </div>
    );
}
export default Detail;