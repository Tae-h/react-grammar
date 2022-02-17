import React, {PureComponent, createRef, memo} from "react";
const { useRef, useState, useEffect } = React;


/* [React LifeCycle]!!!!
* Hooks 라이프 사이클은 없지만 흉내를 낼수 있음!
* */


/* 가위바위보 좌표 */
const rpsCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    바위: 1,
    가위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rpsCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}

const RPSHooks = memo(() => {
    const [score, setScore] = useState(0);
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState('0');

    const interval = useRef(null);

    /**
     * componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
     */
    useEffect(() => {// <-- componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)

        interval.current = setInterval(changeHand, 1000);

        return () => { // <-- 여기가 componentWillUnmount 역할!!
            clearInterval(interval.current);
        }
    }, [imgCoord]) // <-- 배열에 넣은 값들이 바뀔때 useEffect 가 실행 됨!
    // 빈배열이면 처음 렌더링 될때 한번만 실행한다.
    // uesEffect 를 여러번 쓰는 경우도있음 각 state 마다 다르게 세팅 하고 싶을때




    const onClickBtn = (choice) => () => {
        // 가위 바위 보 스톱
        clearInterval(interval.current);

        const myScore = scores[choice];
        const comScore = scores[computerChoice(imgCoord)];

        const diff = myScore - comScore;
        if ( diff === 0 ) {
            setResult('비겼어요!');

        } else if ([1, -2].includes(diff)) {
            setScore((prevScore) => {
                return prevScore + 1;
            });
            setResult('이겼어요!');

        } else { // 진 경우
            setScore((prevScore) => {
                return prevScore - 1;
            });
            setResult('졌다..!');

        }
        setTimeout(() => {

            interval.current = setInterval(changeHand, 1000);
        }, 2000)
    }

    const changeHand = () => {
        if ( imgCoord === rpsCoords.바위 ) {
            setImgCoord(rpsCoords.가위);
        } else if ( imgCoord === rpsCoords.가위 ) {
            setImgCoord(rpsCoords.보);
        } else {
            setImgCoord(rpsCoords.바위);
        }
    }

    return (
        <>
            <div id="computer" style={{ background:  `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )

});

export default RPSHooks;



