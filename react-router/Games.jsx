import React from "react";
import {BrowserRouter, HashRouter, Link, Route, Switch} from 'react-router-dom';
import NumberBaseball from '../3.숫자야구/NumberBaseball';
import Lotto from '../6.로또/Lotto';
import RPS from '../5.가위바위보/RPS';
import GameMatcher from "./GameMatcher";

const Games = () => {

    return (
        <>
            브라우저 라우터
            <BrowserRouter>
                <div>
                    {/* location search 부분에 있 */}
                    <Link to="/game/number-baseball?query=10&data=123&id=natturu">숫자야구</Link><br/>
                    <Link to="/game/rps">가위바위보</Link><br/>
                    <Link to="/game/lotto-gen">로또</Link><br/>
                    <Link to="/game/index">게임매쳐</Link>
                </div>
                <div>
                    <Switch> {/* 일치하는것 한개만 라우트 */}
                        {/*<Route path="/number-baseball" component={NumberBaseball}/>
                        <Route path="/rps" component={ RPS }/>
                        <Route path="/lotto-gen" component={ Lotto }/>*/}
                        {/*<Route path="/game/:name" component={ GameMatcher }/>*/} {/* 동적 라우트 matcher */}
                        <Route path="/game/:name" render={(props) => <GameMatcher {...props}/>}/> {/* 동적 라우트 matcher */}
                        <Route path="/game/number-baseball" render={(props) => <GameMatcher {...props}/>}/> {/* 동적 라우트 matcher */}
                        <Route exact path="/game/number-baseball" render={(props) => <GameMatcher {...props}/>}/> {/* 동적 라우트 matcher */}
                        {/* exact path 주소랑 정확히 일치하는 경우 렌더링 */}
                    </Switch>
                </div>
            </BrowserRouter>


            {/*해시 라우터  해시 라우터는 잘 안씀
            <HashRouter>
                <div>
                    <Link to="/number-baseball">숫자야구</Link><br/>
                    <Link to="/rps">가위바위보</Link><br/>
                    <Link to="/lotto-gen">로또</Link>
                </div>
                <div>
                    <Route path="/number-baseball" component={NumberBaseball}/>
                    <Route path="/rps" component={ RPS }/>
                    <Route path="/lotto-gen" component={ Lotto }/>
                </div>
            </HashRouter>*/}


        </>
    )
}

export default Games;