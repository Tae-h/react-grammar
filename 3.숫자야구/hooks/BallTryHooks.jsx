import React from "react";

//const BallTryHooks = (props) => {
const BallTryHooks = ( { info } ) => { // props 를 구조분해 문법으로!

    return (
        <>
            <li>
                { info.try }
                <div> { info.result } </div>
            </li>
        </>
    )
}

export default BallTryHooks;