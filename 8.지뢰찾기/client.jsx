import React from 'react';
import ReactDom from 'react-dom';

import MineSearch from "./MineSearch";

ReactDom.render(
    <div>
        <MineSearch />
        <br/>
        <br/>
    </div>,
    document.querySelector('#root')
);