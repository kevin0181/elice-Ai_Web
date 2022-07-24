import { useEffect, useState } from "react";
import data from "./data/review.json";

const Review = () => {

    const [reviewData, setReviewData] = useState(data); //리뷰 데이터 가져옴

    return (
        <>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Movie</h1>
                            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br /> 또한 삭제 수정이 가능합니다.</p>
                            <p>
                                <a href="#" className="btn btn-primary my-2">Create Review</a>
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
                                                    src={it.img}
                                                    role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{it.title}</h5>
                                                <p className="card-text">{it.contant.substring(0, ((it.contant).length / 2))}<br /><a className="detailA">...상세보기</a></p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">삭제</button>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">수정</button>
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
            </main>
        </>
    );
}

export default Review;