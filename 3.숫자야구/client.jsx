import React from 'react';
import ReactDom from 'react-dom';

import NumberBaseball from "./NumberBaseball"; // 웹팩의 바벨이 require 로 바꾸줌

ReactDom.render(
    <div>
        <NumberBaseball />
    </div>,
    document.querySelector('#root')
);