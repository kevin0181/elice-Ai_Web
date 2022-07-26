// import data from "./data/review.json";//

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import moment from 'moment';

import url from "./data/serverUrl.json";

import { useDispatch } from 'react-redux';
import { setData } from './app/reducer/Data';


const Review = () => {

    const dispatch = useDispatch(); // action 을 보내는 역할, 디스패치를 날리는 역할

    const navigate = useNavigate();

    // const [reviewData, setReviewData] = useState(data); //리뷰 데이터 가져옴 (초반에 데이터 가져올때)

    const [cookies, setCookie, removeCookie] = useCookies(["tokenData"]);

    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        console.log(reviewData)
    }, [reviewData]);

    const getReviewData = async () => {
        return await axios.get(url.url + "/posts/", {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        })
    }

    useEffect(() => { //데이터 가져옴

        getReviewData().then(res => {
            setReviewData(res.data);
        })

    }, []);

    const deleteReviewData = async (shortId) => {
        return await axios.get(url.url + `/posts/${shortId}/delete`, {
            headers: {
                accessToken: cookies.tokenData.accessToken
            }
        });
    }

    const onClickDeleteReview = (shortId) => {
        if (confirm("삭제 하시겠습니까?")) {
            deleteReviewData(shortId).then((res) => {
                // alert(res.data.result);
                let getNewData = reviewData.filter(it => it.shortId !== shortId);
                setReviewData(getNewData);
            })
        } else {
            return;
        }
    }

    const onClickUpdateReview = (shortId) => {
        dispatch(setData(shortId));
        navigate(`/review/${shortId}/update`);
    }

    const onClickDetailReview = (shortId) => {
        navigate(`/review/${shortId}/detail`);
    }

    return (
        <>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Movie</h1>
                            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br /> 또한 삭제 수정이 가능합니다.</p>
                            <p>
                                <button className="btn btn-primary my-2" onClick={() => {
                                    navigate("/review/create");
                                }}>Create Review</button>
                                {/* <a href="#" className="btn btn-secondary my-2"></a> */}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {
                                reviewData.map((it, index) => (
                                    <div className="col" key={index}>
                                        <div className="card shadow-sm">
                                            <div className="card-img-top" style={{ textAlign: 'center' }}>
                                                <img className="bd-placeholder-img " width="50%" height="225"
                                                    src={it.url}
                                                    role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title" onClick={() => {
                                                    onClickDetailReview(it.shortId)
                                                }}>{it.title}</h5>
                                                <p className="card-text">{it.content.substring(0, ((it.content).length / 2))}<br /><a onClick={() => {
                                                    onClickDetailReview(it.shortId)
                                                }} className="detailA">...상세보기</a></p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                                                            onClickDeleteReview(it.shortId);
                                                        }}>삭제</button>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                                                            onClickUpdateReview(it.shortId);
                                                        }}>수정</button>
                                                    </div>
                                                    <small className="text-muted">작성자 : {it.author.name} &nbsp; |{moment(it.updatedAt).format("YYYY-MM-DD HH:mm:ss")}|</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Review;