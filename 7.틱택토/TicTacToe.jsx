import React, {memo, useState, useRef, useReducer, useCallback, useEffect} from "react";
import Table from "./component/Table";

/* 초기값 세팅 */
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1]
}

/* 모듈로 만들어 버려야 전역에서 쓸수 있음 */
export const SET_WINNER = 'SET_WINNER'; // 변수로 빼두는게 좋음
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

/* 여기서 state 값을 어떻게 바꿀지 정한다 reducer에 기록 */
const reducer = (state, action) => {
    switch ( action.type ) {
        case SET_WINNER: {
            // state.winner = action.winner; <-- 이렇게 직접 바꾸면 안됨!

            return {
                ...state,
                winner: action.winner
            };
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData]; // 얕은 복사
            tableData[action.row] = [...tableData[action.row]] // immer 라이브러리로 가독성 문제 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            };
        }
        case CHANGE_TURN:{
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1]
            }
        }
        default:
            return state;

    }
}

const TicTacToe = memo((callback, deps) => {
    /*const [winner, setWinner] = useState('');
    const [turn, setTurn] = useState('O');
    const [tableData, setTableData] = useState([['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]);*/

    /* state 개수를 줄이는 --> useReducer */
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner, recentCell} = state;

    useEffect(() => {
        const [row, cell] = recentCell;

        console.log(row, cell);

        if (row < 0) {
            return;
        }

        if (cell < 0 ) {
            return;
        }
        let win = false;
        if ( tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }

        if ( tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }

        if ( tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }

        if ( tableData[0][2] === turn && tableData[1][cell] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win);
        /* 순서 보장 해야함!! dispatch 비동기임 */
        if ( win ) {
            console.log('winner!! ', turn);
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});
        } else {
            let allCheck = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        allCheck = false;
                        return;
                    }
                })
            })
            if ( allCheck ) { // 무승부
                dispatch({type: RESET_GAME});
            } else {
                dispatch({type: CHANGE_TURN});
            }
        }

    }, [recentCell]) // 클릭한 셀이 바뀔때마다!


    /*const onClickTable = useCallback(() => {
        console.log('click!!');
        dispatch({ // 보내다... action 을 dispatch 할때마다 reducer 실행
           type: SET_WINNER,
           winner: 'X',
        });

    }, []);*/

    return (
        <>
            <Table tableData={ tableData }  dispatch={dispatch}/>
            {winner && <div>{ winner } 님의 승리!</div>}
        </>
    )
});



export default TicTacToe;