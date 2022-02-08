const React = require("react");
const { Component } = React;


class WordRelay extends Component {
    state = {
        word: '초밥',
        value: '',
        result: '', // 땡 or 딩동댕
    }

    inputEle;

    /* 검증 */
    wordValidation = (e) => {
         e.preventDefault();
         if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
             this.setState({
                 result: '딩동댕!',
                 word: this.state.value,
                 value: '',
             })
         } else {
             this.setState({
                 result: '땡!!',
                 value: '',
             })
         }
        this.inputEle.focus();
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <input type="text"
                       ref={(c) => {
                           this.inputEle = c;
                       }}
                       value={ this.state.value }
                       onChange={(e) => this.setState({
                           value: e.target.value
                       })}
                />
                <button type="button"
                        onClick={this.wordValidation}
                >
                    입력
                </button>
                <p>{ this.state.result }</p>
            </>
        )
    }
}

module.exports = WordRelay;