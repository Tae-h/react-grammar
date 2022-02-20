import React, {useState, PureComponent, Component } from "react";
import Ball from "./Ball";

/* 당첨번호 */
function getWinNumbers () {

     /* 1부터 45까지 채움 */
     const candidate = Array(45) .fill().map((v, i ) => {
         return i + 1;
     });

     const shuffle = [];
     while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
     }
     const bonusNumber = shuffle[shuffle.length - 1];
     const winNumbers = shuffle.slice(0, 6).sort((a, b) => {
         return a - b;
     })
    console.log('getNumbers: ', [...winNumbers, bonusNumber]);
    return [...winNumbers, bonusNumber];
}

export default class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false, // 다시하다..?

    };

    timeouts = [];
    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // 조건을 제대로 정해주지 않으면 setState 가 될때 마다 호출이 된다.
        // 조건별로 지정 필수 ! 그래야 필요할때만 업데이트가 된다!
        if ( this.state.winBalls.length === 0 ) {
            this.runTimeouts();
        }
    }

    runTimeouts = () => {
        const {winNumbers} = this.state;
        for ( let i = 0; i < winNumbers.length - 1; i++ ) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    }

                })
            }, (i + 1) * 1000) // 1 초마다
        }

        /* 보너스 공 */
        setTimeout(() => {
            this.timeouts[6] = this.setState({
                bonus: winNumbers[6],
                redo: true,
            })
        }, 7000)
    }

    componentWillUnmount() {
        this.timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        })

        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div> 당첨숫자 </div>
                <div id="result">
                    { winBalls.map((v) =>
                        <Ball key={v} number={v} />
                    )}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더</button>}
            </>
        )
    }
}