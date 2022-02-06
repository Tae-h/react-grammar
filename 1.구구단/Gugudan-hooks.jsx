const React = require("react");
const { useState, useRef } = React;


const GugudanHooks = () => {
    const [first, setFirst] = useState( Math.ceil(Math.random() * 9) );
    const [second, setSecond] = useState( Math.ceil(Math.random() * 9) );
    const [value, setValue] = useState( '' );
    const [result, setResult] = useState( '' );
    const helloInputRef = useRef(null);

    // state 객체형으로도 사용 가능 다만 불편할수 있음
    const [state, setState] = useState({
        first: Math.ceil( Math.random() * 9 ),
        second: Math.ceil( Math.random() * 9 ),
        value: '', // input value
        result: '',
    });


    const gugudanClick = () => {

        let resultValue = first * second;
        if ( resultValue === parseInt(value) ) {
            //setResult('딩동댕!! 정답: ' + value );
            setResult((prevState) => {
                return '딩동댕!! 정답: ' + value;
            })
            /*setState((prevState) => {
                console.log(prevState);
                return setResult('딩동댕!! 정답: ' + prevState.value);
            })*/
        } else {
            setResult('땡!!');
        }

        gugudanReset();
        helloInputRef.current.focus();
    }

    const gugudanReset = () => {
        setFirst(Math.ceil( Math.random() * 9 ));
        setSecond(Math.ceil( Math.random() * 9 ));
        setValue('');
    }


    const onChangeEvent = (e) => { // 무조건 화살표 함수여야함
        setValue(e.target.value);
    }

    // 주의!! Hooks 에서는 상태값이 변할때마다 GuguDan 함수 자체가 재실행 되기 때문에 기존 문법보다 더 느릴수 있음
    console.log('hooks render!!');
    return (
        <>
            <div>{ first } X { second } = ?</div>
            <input type="number"
                   ref={ helloInputRef }
                   value={ value }
                   onChange={ onChangeEvent }
            />
            <button type="button" onClick={ gugudanClick }>입력</button><br/>
            <p>{ result }</p>
        </>
    )



}

module.exports = GugudanHooks;