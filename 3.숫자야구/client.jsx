import React from 'react';
import ReactDom from 'react-dom';

import NumberBaseball from "./NumberBaseball"; // 웹팩의 바벨이 require 로 바꾸줌
import NumberBaseballHooks from "./hooks/NumberBaseballHooks";
import RenderTest from "./RenderTest";

ReactDom.render(
    <div>
        <NumberBaseball />
        <br/>
        <br/>
        <br/>
        <br/>
        <NumberBaseballHooks />
         <br/>
         <RenderTest />

    </div>,
    document.querySelector('#root')
);