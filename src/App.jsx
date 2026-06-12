import {useEffect, useMemo, useRef, useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false);

    useEffect(
        () => {
            // setTimeout(() => setStarted(true), 2000);
            setStarted(true)
        }, []
    )
    const shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };


    function pics() {
        let base = []
        for (let i = 1; i < 9; i++) {
            base.push(i)
        }

        const {a, b, c} = useMemo(() => {
            return {
                a: shuffle([...base]),
                b: shuffle([...base]),
                c: shuffle([...base])
            };
        }, []);

        // console.log(a,b,c)
        const renderRow = (dataArray) => {
            return dataArray.map((num) => (
                <img
                    key={num}
                    className={`aspect-square h-96 ${started ? "scale-100" : "scale-10"} transition-all duration-[3000ms] rounded-2xl delay-100`}
                    src={`/textures/${num}.png`}
                    alt={`texture-${num}`}
                />
            ));
        };
        {/*// ${started? "rotate-45": ""}*/
        }

        const wow = (min) => {
            let direction = (a) => a ? "-translate-x-250" : "translate-x-250"
            return `${started ? direction(min) : ""}  transition-all duration-[7000ms]`
        }
        return <div
            className={`${!started ? "-rotate-45" : ""} duration-4000  delay-1000 w-screen`}>
            <div className={`grid grid-rows-3 gap-10 -translate-x-300`}>
                <div className={`flex gap-10 ${wow(true)}`}>{renderRow(a)}</div>
                <div className={`flex gap-10 ${wow(false)}`}>{renderRow(b)}</div>
                <div className={`flex gap-10 ${wow(true)}`}>{renderRow(c)}</div>
            </div>
        </div>
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
            {pics()}
        </div>
    )
}

export default App
