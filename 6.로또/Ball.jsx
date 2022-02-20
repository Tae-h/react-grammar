import React, {PureComponent} from "react";

export default class Ball extends PureComponent {

    static = {

    }


    render() {
        let background;
        console.log(this.props);
        const { number } = this.props;

        if ( number <= 10 ) {
            background = 'red';
        } else if ( number <= 20 ) {
            background = 'orange';
        } else if ( number <= 30 ) {
            background = 'yellow';
        } else if ( number <= 40 ) {
            background = 'blue';
        } else {
            background = 'green';
        }


        return (
            <>
                <div className="ball" style={{ background }} >{number}</div>
            </>
        )
    }

}



