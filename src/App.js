import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import "./App.css"; // 내가 직접 추가함
import { useEffect, useReducer, useRef } from "react";

const mockData = [
    {
        id: "mock1",
        date: new Date().getTime(),
        content: "mock1",
        emotionId: 1,
    },
    {
        id: "mock2",
        date: new Date().getTime(),
        content: "mock2",
        emotionId: 2,
    },
    {
        id: "mock3",
        date: new Date().getTime(),
        content: "mock3",
        emotionId: 3,
    },
];

function reducer(state, action) {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            return [action.data, ...state];
        }
        case "UPDATE": {
            return state.map((it) =>
                String(it.id) === String(action.data.id)
                    ? { ...action.data }
                    : it
            );
        }
        case "DELETE": {
            return state.filter(
                (it) => String(it.id) !== String(action.targetId)
            );
        }
        default: {
            return state;
        }
    }
}

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    useEffect(() => {
        dispatch({
            type: "INIT",
            data: mockData,
        });
    }, []);

    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: "CREATE",
            date: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
        idRef.current += 1;
    };
    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: "UPDATE",
            date: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
    };
    const onDelete = (targetId) => {
        dispatch({
            type: "DELETE",
            targetId,
        });
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </div>
    );
}

export default App;
