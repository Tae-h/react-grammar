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
    halted: true,
    dispatch: () => {},
});

const initState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true, // 멈추다
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
export const CLICKED_MINE = 'CLICKED_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            }
        }
        case OPEN_CELL: {
            // 복사
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            //tableData[action.row][action.cell] = CODE.OPENED;

            /* 주변에 지뢰 몇개 있는지 보여줘야 */
            let around = [];
            // 내 윗줄이 있는지 확인
            if ( tableData[action.row - 1] ) {
                /* 위엣줄 있으면 위에 세칸 같이 넣어줌 */
                around = around.concat(
                    tableData[action.row - 1][action.cell -1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1]
                );
            }

            around = around.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1],
            );

            if ( tableData[action.row + 1] ) {
                /* 위엣줄 있으면 위에 세칸 같이 넣어줌 */
                around = around.concat(
                    tableData[action.row + 1][action.cell -1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1]
                );
            }
            /* 주변에 지뢰가 있는지 개수 */
            const count = around.filter((v) => [ CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE ].includes(v)).length;
            tableData[action.row][action.cell] = count;
            return {
                ...state,
                tableData,
            }
        }
        case CLICKED_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]

            if ( tableData[action.row][action.cell] === CODE.MINE ) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            };

            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]

            if ( tableData[action.row][action.cell] === CODE.FLAG_MINE ) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            };

            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]

            if ( tableData[action.row][action.cell] === CODE.QUESTION_MINE ) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            };

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
    const {tableData, halted, timer, result } = state;


    // useMemo 로 캐싱을 해야 contextApi 를 쓸때 성능저하 회적화를 할 수 있음
    const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]);
    return (
        <>
            {/* contextApi 복습 해야함 */}
            {/*<TableContext.Provider value={{ tableData: state.tableData, dispatch }}>*/}
            {/* TableContext 아래 모든 컴포넌트에서 value 를 전부 사용 할 수 있음!!! */}
            <TableContext.Provider value={ value }>
                <Form />

                <div>{ timer }</div>
                <Table />
                <div>{ result }</div>
            </TableContext.Provider>
        </>
    )
}


export default MineSearch;