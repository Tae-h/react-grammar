import React, {memo, useCallback, useContext} from "react";
import {CODE, OPEN_CELL, TableContext} from "../MineSearch";

const getTdStyle = (data) => {
    switch (data) {
        case CODE.NORMAL:
        case CODE.MINE: {
            return {
                background: '#444',
            }
        }
        case CODE.OPENED: {
            return {
                background: 'white',
            }
        }
        default: {
            return {
                background: 'white',
            }
        }
    }
}

const getTdText = (data) => {
    switch (data) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE: {
            return 'X';
        }

        default: {
            return '';
        }
    }
    return data;
}



const Td = memo(({rowIndex, cellIndex}) => {

    const { tableData, dispatch } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        dispatch( { type: OPEN_CELL, row: rowIndex, cell: cellIndex } )
    }, []);

    return (
        <>
            <td style={ getTdStyle( tableData[rowIndex][cellIndex] ) }
                onClick={ onClickTd }
            >
                { getTdText( tableData[rowIndex][cellIndex] ) }
            </td>
        </>
    )
});


export default Td;