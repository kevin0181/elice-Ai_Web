const Create = () => {
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
                            <input type="text" className="form-control" id="title" name={"title"} placeholder="Input Img Url" />
                            <p className="card-text"><small className="text-muted">https://search.pstatic.net/common?type=o&size=174x246&q ...</small></p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name={"title"} placeholder="Movie Title" />
                    </div>
                    <div className="mb-3">
                        <label for="content" className="form-label">Content</label>
                        <textarea className="form-control" id="content" name="content" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-outline-primary m-3">Create</button>
                    <button type="button" class="btn btn-outline-danger">Back</button>
                </form>
            </div>
        </div>
    );
}

export default Create;