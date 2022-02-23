import React, { useCallback } from "react";
import {CLICK_CELL, CHANGE_TURN} from "../TicTacToe";

const Td = ({cellData, cellIndex, rowIndex, dispatch}) => {

    const onClickTd = useCallback(() => {

        /* 이미 cellData 가 있으면 안바뀌게 막아야함 */
        if ( cellData ) {
            return;
        }

        dispatch({ //
            type: CLICK_CELL,
            row: rowIndex,
            cell: cellIndex,
        });
        dispatch({type: CHANGE_TURN});
    }, [cellData]); // cellData 가 바뀔 때만


    return (
        <>
            <td onClick={onClickTd} >{cellData}</td>
        </>
    )
}

export default Td;