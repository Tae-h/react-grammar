import React, { PureComponent } from "react";

/**
 * 렌더링 성능 테스트
 */
class RenderTest extends PureComponent {
    //pureComponent --> state 안의 값들이 변하면 래더 함수 콜
    // 객체나 배열은 감지 못할수 있음
    state = {
        count: 0,
    }

    /**
     * 리액트에서 지원을 하는 메서드
     * 이 메서드로 렌더 시점을 정할수 있음
     * @param nextProps
     * @param nextState
     * @param nextContext
     */
    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 현재 state 랑 값이 드를 때면 렌더링 시켜줄게!
        if ( this.state.count !== nextState.count ) {
            return true;
        }
        return false;
    }*/

    onClick = () => {
        /* setState 호출만 해도 레더 함수 호출 된다 그럼 성능상의 문제가 생길수 있음!!! */
        this.setState( {
            count: this.state.count + 1, // 새로운 객체나 배열을 만들어서 넣어라! 그래야 pureComponent 가 감지를 한다!!
        })
    }

    render() {
        console.log(this.state);
        return (
            <>
                <div>
                    <p> {this.state.count} </p>
                    <button onClick={this.onClick}>입력</button>
                </div>
            </>
        )
    }
}

export default RenderTest;