import React, { memo } from "react";
const { useState, useRef } = React;

const ResponseCheckHooks = memo(() => {
    const [state, setState] = useState('wait');
    const [message, setMessage] = useState('클릭해서 시작 하세요!');
    const [result, setResult] = useState([]);

    /**
     * hooks 에서는 useRef 가 this 의 속성을 선언한다!!!!
     * 변수 사용시 current 를 꼭 붙여야힘!
     * @type {*|React.MutableRefObject<null>}
     */
    const timeout = useRef(null); //hooks 에서는 useRef 가 this 의 속성을 선언한다!!!!
    const startTime = useRef(0);
    const endTime = useRef(0);

    /**
     * useRef Hook 은 Dom 선택 용도 외에, 컴포넌트 안에서 조회 및 수정 가능한 변수를 관리하는 용도!!
     */

    const onClickScreen = () => {

        if ( state === 'wait' ) {
            setState('ready');
            setMessage('초록색이 되면 시작 click!');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이
        } else if ( state === 'ready' ) {
            setState('wait');
            setMessage('너무 성급했군!!');

            clearTimeout(timeout.current); // 시간도 초기화 해줘야함
        } else if ( state === 'now' ) { // 반응속도 체크 해야함

            endTime.current = new Date();
            setState('wait');
            setMessage('클릭해서 시작 하세요!');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            })

        }
    }
    const onReset = () => {
        setResult([]);

    }

    const renderAverage = () => {
        return result.length === 0 ?
            null :
            <>
                <div>추가! 평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={ onReset }>리셋!</button>
            </>
    }

    /* render 안에서는 for, if 를 쓸수가 없 */
    return (
        <>
            <div id="screen"
                 className={ state }
                 onClick={ onClickScreen }
            >
                { message }
            </div>
            {/* 리액트에서 조건문은 삼항연산자로 처리 한다 */}
            {result.length === 0 ?
                null : <div>평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>
            }
            <div>
                { renderAverage() }
            </div>
            {/* if 문 사용법 */}
            <div>
                {(() => {
                    if (result.length === 0) {
                        return null;
                    } else {
                        return <div>평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>;
                    }
                })()}

            </div>
        </>
    )
});

export default ResponseCheckHooks;
