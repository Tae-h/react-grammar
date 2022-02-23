import React from "react";
import Td from "./Td";
const Tr = ({rowData, rowIndex, dispatch}) => {


    return (
        <>
            <tr>
            {Array(rowData.length).fill().map((td, index) => {
                return (
                    <Td key={td + "_" + index} cellData={rowData[index]} cellIndex={index} rowIndex={rowIndex} dispatch={dispatch}/>
                )
            })}
            </tr>
        </>
    )
}

export default Tr;