import React from 'react';
import ReactDom from 'react-dom';

import RPS from "./RPS";
import RPSHooks from "./hooks/RPSHooks";

ReactDom.render(
    <div>
        <RPS />
        <br/>
        <br/>
        <RPSHooks />
    </div>,
    document.querySelector('#root')
);