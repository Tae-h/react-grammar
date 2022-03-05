import React, {memo, useContext} from "react";
import Tr from "./Tr";
import {TableContext} from "../MineSearch";

const Table = memo(() => {

    const { tableData } = useContext(TableContext);
    console.log(tableData)
    return (

        <>
            <table>
                <tbody>
                { Array(tableData.length).fill().map((tr, i) => {
                    return (
                        <Tr key={tr + "_" + i} rowIndex={i}/>
                    )
                })}

                </tbody>
            </table>
        </>
    )
});


export default Table;