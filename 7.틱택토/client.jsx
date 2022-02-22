import React from 'react';
import ReactDom from 'react-dom';

import TicTacToe from "./TicTacToe";

ReactDom.render(
    <div>
        <TicTacToe />
        <br/>
        <br/>
    </div>,
    document.querySelector('#root')
);