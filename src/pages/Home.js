import { useContext, useEffect, useState } from "react";
import Button from "../component/Button";
import Header from "../component/Header";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../util";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const HeaderTitle = `${pivotDate.getFullYear()}년 ${
        pivotDate.getMonth() + 1
    }월`;
    const onIncreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
        );
    };
    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
        );
    };
    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, entTimeStamp } =
                getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= entTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    return (
        <div>
            <Header
                title={HeaderTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
        </div>
    );
};
export default Home;
