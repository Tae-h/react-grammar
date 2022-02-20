import React from 'react';
import ReactDom from 'react-dom';

import Lotto from "./Lotto";
import LottoHooks from "./hooks/LottoHooks";

ReactDom.render(
    <div>
        <Lotto />
        <br/>
        <br/>
        <LottoHooks />
    </div>,
    document.querySelector('#root')
);