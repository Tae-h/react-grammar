const React = require("react"); // 노드의 모듈 시스템
const { useState, useRef } = React;


const WordRelayHooks = () => {
    const [word, setWord] = useState('초밥');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEle = useRef(null);

    /* 검증 */
    const wordValidation = (e) => {
         e.preventDefault();
         if (word[word.length - 1] === value[0]) {
             setResult('딩동댕');
             setWord(value);
             setValue('');
         } else {
             setResult('땡!');
             setValue('');
         }
        inputEle.current.focus();
    }

    const onChangeEvent = (e) => {
        setValue(e.target.value)
    }
    return (
        <>
            <div>{ word }</div>
            <input type="text"
                   ref={ inputEle }
                   value={ value }
                   onChange={ onChangeEvent }
            />
            <button type="button"
                    onClick={ wordValidation }
            >
                입력
            </button>
            <p>{ result }</p>
        </>
    )
}

module.exports = WordRelayHooks;