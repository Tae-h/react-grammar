import React, { useCallback } from "react";
import {CLICK_CELL, CHANGE_TURN} from "../TicTacToe";

const Td = ({cellData, cellIndex, rowIndex, dispatch}) => {

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
}

export default Td;