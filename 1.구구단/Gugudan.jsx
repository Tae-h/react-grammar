const React = require("react");
const { Component } = React;


class Gugudan extends Component {
    state = {
        first: Math.ceil( Math.random() * 9 ),
        second: Math.ceil( Math.random() * 9 ),
        value: '', // input value
        secondVal: '', // input value
        result: '',

    }
    gugudanClick = () => {

        let resultValue = this.state.first * this.state.second;
        if ( resultValue === parseInt(this.state.value) ) {
            this.setState({result: '딩동댕'});
        } else {
            this.setState({result: '땡!'});
        }

        this.gugudanReset();
        this.hello.focus();
    }

    gugudanReset = () => {
        /*this.setState({
            first: Math.ceil( Math.random() * 9 ),
            second: Math.ceil( Math.random() * 9 ),
            value: '',
        })*/
        /**
         * setState 비동기임!!
         */
        this.setState((prevSate) => { // <-- 함수형 setState 이런 방식을 많이씀
            return {
                first: Math.ceil( Math.random() * 9 ),
                second: Math.ceil( Math.random() * 9 ),
                value: '',
                result: '정답: ' + prevSate.value,
            }
        })
    }

    onChangeEvent = (e) => { // 무조건 화살표 함수여야함
        console.log(e.target.value);
        this.setState({
            secondVal: e.target.value
        })
    }

    hello;

    render() { // setState 할때마다 render() 함수 실행 나중에 문제가 될수 있음
        console.log('render');
        return (

            <> { /* 쓸데없는 div --> <> 로 생략 가능 */}
                <div>{this.state.first} X { this.state.second } = ?</div>
                <input type="number"
                       ref={(c) => {
                           this.hello = c;
                       }}
                       value={ this.state.value }
                       onChange={(e) => this.setState( { value: e.target.value } )}
                />
                {/* class 함수랑 겹칭수 있음 className 이라고 써야함 */}
                {/* for 도 반복문 for 랑 겹쳐서 마찬가지임 */}
                <button type="button"
                        className="btnClass"
                        htmlFor="dd"
                        onClick={this.gugudanClick}>입력</button><br/>
                <input type="number"  value={ this.state.secondVal } onChange={this.onChangeEvent}/>
                <p>{ this.state.result }</p>
            </>
        );
    }
}

module.exports = Gugudan;