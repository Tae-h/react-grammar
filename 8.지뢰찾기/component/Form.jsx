import React, { useState, useCallback, useContext } from "react";
import { TableContext } from "../MineSearch";



const Form = () => {

    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(10); // 지뢰

    const { dispatch } = useContext(TableContext);

    const onRowChange = useCallback((e) => {
        setRow(e.target.value);
    }, [row])

    const onCellChange = useCallback((e) => {
        setCell(e.target.value);
    }, [cell]);

    const onMineChange = useCallback((e) => {
        setMine(e.target.value);
    }, [mine]);

    const onclickStart = useCallback(() => {
        dispatch({type: START_GAME, row, cell, mine});
    }, [row, cell, mine]);

    return (
        <>
            <div>
                <input type="number" placeholder="세로" value={ row } onChange={ onRowChange } />
                <input type="number" placeholder="가로" value={ cell } onChange={ onCellChange } />
                <input type="number" placeholder="지롸" value={ mine } onChange={ onMineChange } />
                <button onClick={ onclickStart }>Start!</button>
            </div>
        </>
    )
}


export default Form;