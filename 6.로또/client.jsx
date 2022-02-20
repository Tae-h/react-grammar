import React from 'react';
import ReactDom from 'react-dom';

import Lotto from "./Lotto";

ReactDom.render(
    <div>
        <Lotto />
        <br/>
        <br/>
    </div>,
    document.querySelector('#root')
);