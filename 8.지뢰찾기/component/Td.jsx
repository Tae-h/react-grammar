import React, {memo, useCallback, useContext} from "react";
import {CLICKED_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "../MineSearch";

const getTdStyle = (data) => {
    switch (data) {
        case CODE.NORMAL:
        case CODE.MINE: {
            return {
                background: '#444',
            }
        }
        case CODE.CLICKED_MINE:
        case CODE.OPENED: {
            return {
                background: 'white',
            }
        }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
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
        case CODE.CLICKED_MINE: {
            return '펑';
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';

        default: {
            return data || '';
        }
    }
    return data;
}



const Td = memo(({rowIndex, cellIndex}) => {

    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {

        if ( halted ) {
            return;
        }

        switch ( tableData[rowIndex][cellIndex] ) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL: {
                dispatch( { type: OPEN_CELL, row: rowIndex, cell: cellIndex } );
                return;
            }
            case CODE.MINE : {
                dispatch( { type: CLICKED_MINE, row: rowIndex, cell: cellIndex } );
                return;
            }
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    /* 우클릭시 */
    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 우클릭시 메뉴 뜨는걸 방지 하기 위해!!

        if ( halted ) {
            return;
        }

        switch ( tableData[rowIndex][cellIndex] ) {

            case CODE.NORMAL:
            case CODE.MINE:
                dispatch( { type: FLAG_CELL, row: rowIndex, cell: cellIndex } );
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch( { type: QUESTION_CELL, row: rowIndex, cell: cellIndex } );
                return;;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch( { type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex } );
                return;
            case CODE.OPENED:


            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex], halted]);


    return (
        <>
            <td style={ getTdStyle( tableData[rowIndex][cellIndex] ) }
                onClick={ onClickTd }
                onContextMenu={ onRightClickTd }
            >
                { getTdText( tableData[rowIndex][cellIndex] ) }
            </td>
        </>
    )
});


export default Td;