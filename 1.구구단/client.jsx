const React = require('react');
const ReactDom = require('react-dom');

const Gugudan = require('./Gugudan');
const GugudanHooks = require('./Gugudan-hooks');


ReactDom.render(
    <div>
        <Gugudan />
        <GugudanHooks />
    </div>,
    document.querySelector('#root')
);
//ReactDom.render(<GugudanHooks />, document.querySelector('#root2'));