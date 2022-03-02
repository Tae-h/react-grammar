import React, {useContext} from "react";
import Td from "./Td";
import {TableContext} from "../MineSearch";

const Tr = ({rowIndex}) => {
    const { tableData } = useContext(TableContext);
    console.log(tableData[rowIndex]);

    return (
        <>
            <tr>
                { tableData[0] && Array(tableData[0].length).fill().map((td, i) => {
                    return (
                        <Td  rowIndex={rowIndex} cellIndex={i}/>
                    )
                })}

            </tr>
        </>
    )
}


export default Tr;