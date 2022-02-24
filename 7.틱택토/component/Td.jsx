import React, {memo, useCallback, useEffect, useRef} from "react";
import {CLICK_CELL, CHANGE_TURN} from "../TicTacToe";



/* 성능 최적화 --> memo가 짱임! */
const Td = memo(({cellData, cellIndex, rowIndex, dispatch}) => {
    console.log('td');

    /*  성능 최적화!!
    * useEffect, useRef 로 무엇때문에 계속 리렌더링 되는지 파악 해야함!
    * 아래방식으로 성능 체크
    * */
    const ref = useRef([]);
    useEffect(() => {
        console.log(ref.current);
        // false 가 범인임 false 일 경우 리렌더링이 일어난다
        console.log(cellData === ref.current[0], cellIndex === ref.current[1],rowIndex === ref.current[2],dispatch === ref.current[3]);
        ref.current = [cellData, cellIndex, rowIndex, dispatch]
    }, [cellData, cellIndex, rowIndex, dispatch]);


    const onClickTd = useCallback(() => {

        /* 이미 cellData 가 있으면 안바뀌게 막아야함 */
        if ( cellData ) {
            return;
        }

        // dispatch 비동기 CLICK_CELL 실행 중에 CHANGE_TURN 발생
        dispatch({ //
            type: CLICK_CELL,
            row: rowIndex,
            cell: cellIndex,
        });

    }, [cellData]); // cellData 가 바뀔 때만


    return (
        <>
            <td onClick={onClickTd} >{cellData}</td>
        </>
    )
})

export default Td;