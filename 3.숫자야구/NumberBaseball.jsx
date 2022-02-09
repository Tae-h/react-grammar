//const React = require("react");
//const { Component } = React;

import React, { Component } from "react";
// webpack의 바벨이 알아서 require로 바꿔주기 때문에 import 써도 상관 없음!


function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [1,2,3,4,5],
    }

    onChangeInput = (e) => {


    }

    render() {
        return (
            <>
                <h1>{ this.state.result }</h1>
                <input maxLength={4} value={ this.state.value } onChange={ this.onChangeInput }/>
                <div>시도 { this.state.tries.length }</div>
                <ul>

                    { this.state.tries.map((v) => {
                        return (
                            <li>{ v }</li>
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