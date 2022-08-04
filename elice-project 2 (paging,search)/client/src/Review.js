// import reviewData from "./data/review.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "./data/port.json";
import { useCookies } from "react-cookie";

//Redux
import { useDispatch } from "react-redux";
import { setData } from "./app/reducer/Data";

const Review = () => {

    const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할

    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState([]);

    const [page, setPage] = useState({
        page: 1,             //현재 보고있는 페이지 번호
        totalPage: 0        //전체 페이지 수
    });

    useEffect(() => { //렌더링이 되었다면 1번만 실행되는곳.

        getReviewData(page.page);

    }, []);

    const getReviewData = (page) => {
        try {
            axios.get(url.url + `/posts?page=${page}&perPage=6`, {
                headers: {
                    accessToken: cookies.userData.accessToken
                }
            }).then(res => {
                // console.log(res);

                setReviewData(res.data.posts);

                setPage({
                    page: page,
                    totalPage: res.data.totalPage
                });

            }).catch(e => {
                console.log(e);
            });
        } catch (e) {
            navigate("/");
        }
    }

    const onClickPagination = (page) => {
        getReviewData(page);
    }


    //---------------------------delete-----------------------------------

    const deleteReview = async (shortId) => {
        return await axios.get(url.url + `/posts/${shortId}/delete`, {
            headers: {
                accessToken: cookies.userData.accessToken
            }
        })
    }

    const onClickDeleteButton = (shortId) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            //예
            deleteReview(shortId).then(res => {
                let getNewDeleteAfterData = reviewData.filter(it => it.shortId !== shortId);
                setReviewData(getNewDeleteAfterData);
            })
        } else {
            //아니오.
            return;
        }
    }
    //--------------------------------------------------------------------

    //----------------------------------update------------------------------

    const onClickUpdateButton = (shortId) => {
        dispatch(setData(shortId));
        navigate(`/review/${shortId}/update`);
    }


    //--------------------------------------------------------------------


    //------------------------------------detail---------------------------

    const onClickDetailButton = (shortId) => {

        navigate(`/review/${shortId}/detail`);

    }

    //---------------------------------------------------------------------


    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Movie</h1>
                        <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고,
                            별점을 주세요.<br />
                            또한 삭제, 수정이 가능합니다.
                        </p>
                        <p>
                            <button onClick={() => { navigate('/review/create') }}
                                className="btn btn-primary my-2 m-1">Create Review</button>
                        </p>
                    </div>
                </div>
            </section>
            <div className="album py-5">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        {
                            reviewData.map((it, index) => (
                                <div className="col" key={index}>
                                    <div className="card shadow-sm">
                                        <div className="card-img-top" style={{ textAlign: "center" }} >
                                            <img className="bd-placeholder-img " width="50%"
                                                height="225" role="img" src={it.img}
                                                aria-label="Placeholder: Thumbnail"
                                                preserveAspectRatio="xMidYMid slice"
                                                focusable="false" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title" onClick={() => {
                                                onClickDetailButton(it.shortId);
                                            }}>{it.title}</h5>
                                            <p className="card-text">
                                                {it.content.substring(0, ((it.content).length / 2))}
                                                <a onClick={() => onClickDetailButton(it.shortId)} style={{ color: 'blue' }}>&nbsp;&nbsp;&nbsp;...상세보기</a>
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" onClick={() => {
                                                        onClickDeleteButton(it.shortId);
                                                    }} className="btn btn-sm btn-outline-secondary">삭제</button>
                                                    <button type="button" onClick={() => {
                                                        onClickUpdateButton(it.shortId);
                                                    }} className="btn btn-sm btn-outline-secondary">수정</button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <nav aria-label="Page navigation example" style={{ display: "inline-block" }}>
                    <ul className="pagination">
                        {
                            (page.page - 1) < 1 ? (<></>) : (<>
                                <li className="page-item">
                                    <a className="page-link" aria-label="Previous"
                                        onClick={() => onClickPagination(page.page - 1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={() => onClickPagination(page.page - 1)}>
                                        {page.page - 1}
                                    </a>
                                </li>
                            </>)
                        }

                        <li className="page-item active"><a className="page-link" onClick={() => onClickPagination(page.page)}>{page.page}</a></li>
                        {
                            (page.page + 1) > page.totalPage ? (<></>) : (<>
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={() => onClickPagination(page.page + 1)}>
                                        {page.page + 1}
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" aria-label="Next"
                                        onClick={() => onClickPagination(page.page + 1)}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </>)
                        }
                    </ul>
                </nav>
            </div>
        </main>
    )
}

export default Review;