import React, {memo, useMemo} from "react";
import Td from "./Td";


const Tr = memo(({rowData, rowIndex, dispatch}) => {

    /* useMemo 최후의 수단 */
    return (
        <>
            <tr>
            {Array(rowData.length).fill().map((td, index) => (
                useMemo( // 최후의 수단임
                    () =>
                        <Td key={td + "_" + index} cellData={rowData[index]} cellIndex={index} rowIndex={rowIndex} dispatch={dispatch}/>,
                        [rowData[index]], // rowData[index] 가 바뀔때만 리렌더링
                )
                ))}
            </tr>
        </>
    )
});

export default Tr;