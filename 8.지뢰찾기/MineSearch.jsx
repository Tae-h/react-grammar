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

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
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
            <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
                <Form />
                <div>{ state.timer }</div>
                <Table />
                <div>{ state.result }</div>
            </TableContext.Provider>
        </>
    )
}


export default MineSearch;