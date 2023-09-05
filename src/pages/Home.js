import Editor from "../component/Editor";

const Home = () => {
    return (
        <div>
            <Editor
                onSubmit={() => {
                    alert("완료 버튼 클릭함");
                }}
            />
        </div>
    );
};
export default Home;
