 import React, { Component } from "react";

class BallTry extends Component {
    state = {

    }

    render() {
        return (
            <>
                <li>
                    {this.props.v.try}
                    <div> {this.props.v.result} </div>
                </li>
            </>
        )
    }
}

export default BallTry;