//const React = require("react");
//const { Component } = React;

import React, { Component } from "react";
import BallTry from "./BallTry";
// webpack 의 바벨이 알아서 require 로 바꿔주기 때문에 import 써도 상관 없음!

// 이 function 이 다른데서도 쓰이고 this가 쓰일 필요 없을때 class 밖에다가
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for ( let i = 0; i < 4; i++ ) { // 4번 뽑아야함
        const chosen = candidate.splice(Math.floor( Math.random() * (9 - i) ), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    /* 화살표 함수를 안쓰고 싶을때 constructor 함수 써줘야함 */
    /*constructor(props) {
        super(props);

        this.state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: [1,2,3,4,5],
        }
        // 함수도 바인딩 해줘야함
        this.onClickEvent = this.onClickEvent().bind(this);
    }*/

    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [], // react 에선 push 쓰면 안댐!!! why? 리액트에선 리스트가 변화 했는지 감지를 못함
    }

    /* 화살표 함수를 안써도 되지만 안쓰면 화살표 함수를 못씀 */
    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        })


    }

    onClickInput = (e) => {
        e.preventDefault();
        console.log(this.state.answer);
        /* 입력한 값이랑 문제랑 같으면 */
        if ( this.state.value === this.state.answer.join('') ) {
            this.setState({
                result: '홈런!',
                answer: getNumbers(),
                // 예전 state 랑 현재 state 랑 달라야 리액트에서 감지를 한다
                tries: [...this.state.tries, {try: this.state.value, result: `홈런 ${this.state.value}`}],
                value: '',
            })
        } else {
            const valArr = this.state.value.split('').map((v) => parseInt(v));

            let strike = 0;
            let ball = 0;

            // 10번 틀리면
            if ( this.state.tries.length >= 9 ) {
                this.setState({
                    result: `10회 이상 틀렸습니다. 실패!!!! 답은: ${ answer.join() } 입니다!`,
                })
                alert('게임을 다시 시작 합니다!');

                this.setState({
                    answer: getNumbers(),
                    tries: [],
                    result: '',
                    value: '',
                })
            } else {
                // 10번 이하로 틀렸을때!
                for ( let i = 0; i < 4; i++ ) {
                    if ( valArr[i] === this.state.answer[i] ) {
                        strike++;
                    } else if ( this.state.answer.includes(valArr[i]) ) {
                        ball++;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼`}],
                    value: '',
                })

            }

        }


    }

    render() {
        return (
            <>
                <h1>{ this.state.result }</h1>
                <input maxLength={4} value={ this.state.value } onChange={ this.onChangeInput }/>
                <button type="button"
                        onClick={this.onClickInput}
                > 입력
                </button>
                <div>시도 { this.state.tries.length }</div>
                <ul>
                    { this.state.tries.map((v, index) => {
                        return ( // return 생략 가능
                            /* key 는 고유값 이어야함 안넣어주면 에러 key 값에 index 값을 넣으면 나중에 성능 최적화 때문에 문제 생길수 있음 고유값을 만들어서 넣어줘야
                            * react 에서 key 를 기준으로 엘리먼트를 추가,삭제,변경을 판단하기 때문에 배열의 순서가 바뀌면 문제 될수 있다. 따라서 key 값을 index로 하면 안됨!
                            *
                            * */
                            //<li key={index} >value: { v },  index: {index}</li>
                            <BallTry key={v + "_" + index} v={v} index={index} /> // 성능상의 문제, 가독성의 문제 때문에 Component 화
                        );
                    }) }
                </ul>
            </>
        )
    }
}

export default NumberBaseball;
//module.exports = NumberBaseball;
/**
 * 웹팩 require 를 사용 하지만
 * 리액트 에서는  import를 사용한다.
 * 리액트를 노드로 돌리지만 import를 사용 할 수 있는 이유는
 * 바벨이 import --> require로 바꿔주기 때문문 */
/*
const React = require("react");
export.hello = 'hello';
module.export = NumberBaseball
* */