import React from 'react';
import ReactDom from 'react-dom';

import ResponseCheck from './ResponseCheck';

ReactDom.render(
    <div>
        <ResponseCheck />
        <br/>
        <br/>
    </div>,
    document.querySelector('#root')
);