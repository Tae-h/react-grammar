import React, { memo, useState} from "react";


/* memo ==> props 나 state 가 바뀌었을 경우에만 렌더  */

//const BallTryHooks = (props) => {
const BallTryHooks = memo( ({ info } ) => { // props 를 구조분해 문법으로!
    // 부모에게 받은 props 변경 하고 싶을때 set!!!
    const [result, setResult] = useState(info.result);

    const onClickResult = () => {
        setResult('1');
    }

    return (
        <>
            <li>
                { info.try }
                <div onClick={onClickResult}> { result } </div>
            </li>
        </>
    )
});

export default BallTryHooks;