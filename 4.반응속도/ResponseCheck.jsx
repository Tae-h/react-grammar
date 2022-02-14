import React, { PureComponent, createRef } from "react";

export default class ResponseCheck extends PureComponent {

    state = {
        state: 'wait',
        message: '클릭해서 시작하세요!!',
        result: [],
    }

    timeout;
    startTime; // 렌더링 하고싶지 않은 변수는 state 밖으로 빼야함
    endTime;
    onClickScreen = () => {
        const {state, message, result} = this.state;

        if ( state === 'wait' ) {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 시작 click!',
            })
            this.timeout = setTimeout(() => {
                console.log('111');
                this.setState({
                    state: 'now',
                    message: '지금 클릭!',
                })
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이
        } else if ( state === 'ready' ) {
            this.setState({
                state: 'wait',
                message: '너무 성급하셨군요!',
            });
            clearTimeout(this.timeout); // 시간도 초기화 해줘야함
        } else if ( state === 'now' ) { // 반응속도 체크 해야함
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'wait',
                    message: '클릭해서 시작 하세요!',
                    result: [...prevState.result, this.endTime - this.startTime],
                }

            })
        }
    }

    renderAverage = () => {
        return this.state.result.length === 0 ?
                null : <div>평균시간 {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
    }

    /* render 안에서는 for, if 를 쓸수가 없 */
    render() {
        return (
            <>
                <div id="screen"
                     className={ this.state.state }
                     onClick={ this.onClickScreen }
                >
                    { this.state.message }
                </div>
                {/* 리액트에서 조건문은 삼항연산자로 처리 한다 */}
                {this.state.result.length === 0 ?
                    null : <div>평균시간 {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                }
                <div>
                   평균 { this.renderAverage }
                </div>
            </>
        )
    }
}
