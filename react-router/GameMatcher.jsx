import React, {PureComponent} from "react";
import  {withRouter } from 'react-router-dom'; //this.props.history or match 없으면 사용
import NumberBaseball from '../3.숫자야구/NumberBaseball';
import Lotto from '../6.로또/Lotto';
import RPS from '../5.가위바위보/RPS';


class GameMatcher extends PureComponent{


    render() {
        console.log(this.props);
        console.log(this.props.match.params.name);
        console.log('query string: ',  this.props.location.search.slice(1)  );
        console.log(new URLSearchParams( this.props.location.search.slice(1) ) );

        let urlSearchParams = new URLSearchParams( this.props.location.search.slice(1) );
        console.log(urlSearchParams.get('data')); // <-- key 값
        console.log(urlSearchParams.get('id')); // <-- key 값

        // 여기서 분기 처리
        let matchName = this.props.match.params.name;
        if ( matchName === 'number-baseball' ) {
            return <NumberBaseball/>;
        } else if ( matchName === 'rps' ) {
            return <RPS/>;
        } else if ( matchName === 'lotto-gen' ) {
            return <Lotto/>;
        }
         // 일치하지 않는 경우
        return (
            <>
                <div>
                    게임매쳐
                    일치하는 게임이 없으요!
                </div>
            </>
        )
    }
}

export default GameMatcher;