import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "../util";
import Header from "../component/Header";
import Button from "../component/Button";

const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // 뒤로가기
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    if (!data) {
        //예외처리; undefined 값을 객체로 오인해 프로퍼티에 접근하려는 동작을 방지함
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const { date, emotionId, content } = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        return (
            <div>
                <Header
                    title={title}
                    leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
                    rightChild={<Button text={"수정하기"} onClick={goEdit} />}
                />
                <div>{id}번 일기</div>
                <div>Diary페이지</div>
            </div>
        );
    }
};
export default Diary;
