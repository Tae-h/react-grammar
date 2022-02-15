import React from 'react';
import ReactDom from 'react-dom';

import ResponseCheck from './ResponseCheck';
import ResponseCheckHooks from "./hooks/ResponseCheckHooks";

ReactDom.render(
    <div>
        <ResponseCheck />
        <br/>
        <br/>
        <ResponseCheckHooks />
    </div>,
    document.querySelector('#root')
);