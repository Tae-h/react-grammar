import React from "react";
import Tr from "./Tr";
const Table = ({tableData, onClick, dispatch}) => {
    return (
        <>
            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, index) => {
                        return (
                            <Tr key={tr+ "_" + index}  rowData={tableData[index]} rowIndex={index} dispatch={dispatch}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table;