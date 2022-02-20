import React, {useState, PureComponent, Component, memo, useRef, useEffect, useMemo, useCallback} from "react";
import BallHooks from "./BallHooks";

/* 당첨번호 */
function getWinNumbers () {

     /* 1부터 45까지 채움 */
     const candidate = Array(45) .fill().map((v, i ) => {
         return i + 1;
     });

     const shuffle = [];
     while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
     }
     const bonusNumber = shuffle[shuffle.length - 1];
     const winNumbers = shuffle.slice(0, 6).sort((a, b) => {
         return a - b;
     })
    console.log('getNumbers hooks: ', [...winNumbers, bonusNumber]);
    return [...winNumbers, bonusNumber];
}

const LottoHooks = memo(() => {

    /*
    * useMemo 는 값을 기억 --> 함수의 리턴값을 기억
    * useCallback 은 함수 자체를 기억
    * */
    const lottoNumbers = useMemo(() => getWinNumbers(), []) // 캐싱!! , 배열안에 요소값이 바뀌면 그때 다시 호출이 된다.
   const [winNumbers, setWinNumbers] = useState(lottoNumbers);
   const [winBalls, setWinBalls] = useState([]);
   const [bonus, setBonus] = useState(null);
   const [redo, setRedo] = useState(false);
   const timeouts = useRef([]);


   useEffect(() => { // <-- componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
        runTimeouts();

       return () => { // <-- 여기가 componentWillUnmount 역할!!
           timeouts.current.forEach((timeout) => {
               clearTimeout(timeout);
           })
       }
   }, [timeouts.current]) // <-- 빈 배열이면 componentDidMount 랑 같음
    // 배열에 요소가 들어 있으면 componentDidMount, componentDidUpdate 역할 둘다 수행


    const runTimeouts = () => {
        for ( let i = 0; i < winNumbers.length - 1; i++ ) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => {
                    return [...prevBalls, winNumbers[i]]
                })

            }, (i + 1) * 1000) // 1 초마다
        }

        /* 보너스 공 */
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);

        }, 7000)
    }

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, []);

    return (
        <>
            <div> 당첨숫자 </div>
            <div id="result">
                { winBalls.map((v) =>
                    <BallHooks key={v} number={v} />
                )}
            </div>
            <div>보너스</div>
            {bonus && <BallHooks number={ bonus } />}
            {redo && <button onClick={ onClickRedo }>한 번 더</button>}
        </>
    )
});

export default LottoHooks;