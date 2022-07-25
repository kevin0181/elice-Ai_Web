import { useParams } from "react-router-dom";

const Page = () => {
    const { id } = useParams();
    return (
        <>
            <div>
                <p>{id}번째, Page입니다.</p>
            </div>
        </>
    )
}

export default Page;