import React, { PureComponent, createRef } from "react";


/* [React LifeCycle]!!!!
* 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
* -> (setState, props 바뀔때) -> shouldComponentUpdate -> render -> componentDidUpdate
* 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸
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

export default class RPS extends PureComponent {

    state = {
        score: 0,
        result: '', // 결과
        imgCoord: '0', // 이미지 좌표
    }

    interval;

    /**
     * 렌더가 '처음' 성공적으로 실행 되고 call
     * 리 렌더링 이 일어날때는 call 안됨
     */
    componentDidMount() { // 보통 여기서 비동기 요청을 많이 한다

        // interval 꼭 없애 줘야함 메모리 참
        this.interval = setInterval(this.changeHand, 1000);
    }

    /**
     * 리렌더링후 실행
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    /**
     * 컴포넌트가 제거되기 직전 call
     * 부모에 의해서 없어질때 call
     */
    componentWillUnmount() { // --> 비동기 요청 정를 많이함, 완료되지 않은 비동기 정리
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        const { imgCoord } = this.state;
        // 가위 바위 보 스톱
        clearInterval(this.interval);

        const myScore = scores[choice];
        const comScore = scores[computerChoice(imgCoord)];

        const diff = myScore - comScore;
        if ( diff === 0 ) {
            this.setState({
                result: '비김!'
            })
        } else if ([1, -2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겻슴!',
                    score: prevState.score += 1
                }
            })
        } else { // 진 경우
            this.setState((prevState) => {
                return {
                    result: '짐!',
                    score: prevState.score -= 1
                }
            })
        }
        setTimeout(() => {

            this.interval = setInterval(this.changeHand, 1000);
        }, 2000)
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if ( imgCoord === rpsCoords.바위 ) {
            this.setState({
                imgCoord: rpsCoords.가위
            })
        } else if ( imgCoord === rpsCoords.가위 ) {
            this.setState({
                imgCoord: rpsCoords.보
            })
        } else {
            this.setState({
                imgCoord: rpsCoords.바위
            })
        }
    }

    //url (https://en.pimg.jp/023/182/267/1/23182267.jpg)
    /* render 안에서는 for, if 를 쓸수가 없 */
    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background:  `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
