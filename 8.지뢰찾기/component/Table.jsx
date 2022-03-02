import React, { useContext } from "react";
import Tr from "./Tr";
import {TableContext} from "../MineSearch";

const Table = () => {

    const { tableData } = useContext(TableContext);
    console.log(tableData)
    return (

        <>
            <table>
                <tbody>
                { Array(tableData.length).fill().map((tr, i) => {
                    return (
                        <Tr  rowIndex={i}/>
                    )
                })}

                </tbody>
            </table>
        </>
    )
}


export default Table;