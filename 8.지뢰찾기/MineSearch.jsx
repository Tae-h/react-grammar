import React, {useReducer, createContext, useMemo, useEffect} from "react";
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
    openedCount: 0, // 연 갯수
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    count: 0,
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
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                data: {
                  row: action.row,
                  cell: action.cell,
                  mine: action.mine,
                },
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount: 0,
                timer: 0,
            }
        }
        case OPEN_CELL: {
            // 복사
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            //tableData[action.row][action.cell] = CODE.OPENED;

            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0; // Open 개수
            const checkAround = (row, cell) => {

                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row, cell])){
                    return;
                }

                /* 상하 좌우 칸이 아닌 경우 필터링 */
                if ( row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length ) {
                    return;
                }

                if ( checked.includes(row + ',' + cell) ) {
                    return;
                } else {
                    checked.push(row + ',' + cell);
                }

                /* 주변에 지뢰 몇개 있 는지 보여줘야 */
                let around = [];
                // 내 윗줄이 있는지 확인
                if ( tableData[row - 1] ) {
                    /* 위엣줄 있으면 위에 세칸 같이 넣어줌 */
                    around = around.concat(
                        tableData[row - 1][cell -1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    );
                }

                around = around.concat(
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                );

                if ( tableData[row + 1] ) {
                    /* 위엣줄 있으면 위에 세칸 같이 넣어줌 */
                    around = around.concat(
                        tableData[row + 1][cell -1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1]
                    );
                }
                /* 주변에 지뢰가 있는지 개수 */
                let count = around.filter(function(v) {
                    return [ CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE ].includes(v);
                }).length;

                /* 주변에 지뢰가 없을 때 */
                if ( count === 0 ) {
                    if ( row > -1 ) {
                        const near = [];
                        /* 제일 윗칸  */
                        if ( row - 1 > -1  ) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        /* 제일 아래칸 */
                        if ( row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if ( tableData[n[0]][n[1]] !== CODE.OPENED ) {
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                }
                if ( tableData[row][cell] === CODE.NORMAL ) { // 닫힌 칸일 경우만
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);

            /* 승리 판단 */
            let halted = false;
            let result = '';
            if ( state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount ) {
                halted = true;
                result = `${state.timer}초만에 승리 하셨습니다`;
            }

            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
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
        case INCREMENT_TIMER: {


            return {
                ...state,
                timer: state.timer + 1,
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

    useEffect(() => {
        let timer;
        if ( halted === false ) {
            timer = setInterval(() => {
                dispatch({type: INCREMENT_TIMER});
            }, 1000);

        }
        return () => {
            clearInterval(timer);
        }

    }, [halted]);

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