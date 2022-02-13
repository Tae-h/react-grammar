 import React, { Component, PureComponent } from "react";

class BallTry extends PureComponent {
    state = {
        result: this.props.v.result,
    }

    onClickResult = () => {
        this.setState({
            result: '1'
        })
    }

    render() {
        const { v } = this.props;
        return (
            <>
                <li>
                    {v.try}
                    <div onClick={this.onClickResult}> {this.state.result} </div>
                </li>
            </>
        )
    }
}

export default BallTry;