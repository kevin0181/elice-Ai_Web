import Create from "./pages/review/Create";

function ReviewCreate() {
    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Moview</h1>
                        <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br /> 또한 삭제 수정이 가능합니다.</p>
                    </div>
                </div>
            </section>
            <Create />
        </main>
    );
}

export default ReviewCreate;
