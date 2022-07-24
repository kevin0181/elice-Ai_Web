const Review = () => {
    return (
        <>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Moview</h1>
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
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img className="bd-placeholder-img card-img-top" width="100%" height="225"
                                        src="https://search.pstatic.net/common?type=o&size=174x246&quality=100&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20220720_283%2F1658284839003UzxoT_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2"
                                        role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                                    <div className="card-body">
                                        <h5 className="card-title">미니언즈 2</h5>
                                        <p className="card-text">세계 최고의 슈퍼 악당을 꿈꾸는 미니보스 ‘그루’와 그를 따라다니는 미니언들. 어느 날 그루는 최고의 악당 조직 ‘빌런6’의 마법 스톤을 훔치는데 성공하지만 뉴페이스 미니언 ‘오토’의 실수로 스톤을 잃어버리고 빌런6에게 납치까지 당한다. 미니보스를 구하기 위해 잃어버린 스톤을 되찾아야 하는 ‘오토’, 그리고 쿵푸를 마스터해야 하는 ‘케빈’, ‘스튜어트’, ‘밥’! 올여름 극장가를 점령할 MCU(미니언즈 시네마틱 유니버스)가 돌아온다!</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="myBtn-red btn btn-sm btn-outline-secondary">삭제</button>
                                                <button type="button" className="myBtn-yellow btn btn-sm btn-outline-secondary">수정</button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Review;