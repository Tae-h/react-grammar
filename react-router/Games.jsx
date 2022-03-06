import React from "react";
import {BrowserRouter, HashRouter, Link, Route} from 'react-router-dom';
import NumberBaseball from '../3.숫자야구/NumberBaseball';
import Lotto from '../6.로또/Lotto';
import RPS from '../5.가위바위보/RPS';

const Games = () => {

    return (
        <>
            <BrowserRouter>
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
            </BrowserRouter>


        </>
    )
}

export default Games;