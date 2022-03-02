import React, {useReducer, createContext, useMemo} from "react";
import Table from "./component/Table";
import Form from "./component/Form";


export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}
export const TableContext = createContext({
    // 기본값 넣을 수 있음
    tableData: [],
    dispatch: () => {},
});

const initState = {
    tableData: [],
    timer: 0,
    result: '',

};

const plantMine = (row, cell, mine ) => {
    console.log(row, cell, mine);

    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    })
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for ( let i = 0; i < row; i++ ) {
        const rowData = [];
        data.push(rowData);
        for ( let j = 0; j < cell; j++ ) {
            rowData.push(CODE.NORMAL);
        }
    }
    for ( let k = 0; k < shuffle.length; k++ ) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            }
        }
        case OPEN_CELL: {
            // 복사
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
            }
        }

        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    // useMemo 로 캐싱을 해야 contextApi 를 쓸때 성능저하 회적화를 할 수 있음
    const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);
    return (
        <>
            {/* contextApi 복습 해야함 */}
            {/*<TableContext.Provider value={{ tableData: state.tableData, dispatch }}>*/}
            {/* TableContext 아래 모든 컴포넌트에서 value 를 전부 사용 할 수 있음!!! */}
            <TableContext.Provider value={ value }>
                <Form />
                <div>{ state.timer }</div>
                <Table />
                <div>{ state.result }</div>
            </TableContext.Provider>
        </>
    )
}


export default MineSearch;