import Display from "./Display.js"
import { useState } from "react"




const NumberKeys = () => {
    const [result, setResult] = useState("")
    const [clickValue, setClickValue] = useState("0")
    const [finalResult, setFinalResult] = useState(true)

    const updateNumberClick = (e) => {
        if (finalResult && clickValue ==="0"){
            setClickValue((parseFloat(clickValue)+parseFloat(e.target.innerHTML)).toString())
        } else if (finalResult && clickValue !== "0") {
            setClickValue(clickValue+(e.target.innerHTML))
        } else {
            setClickValue((parseFloat(e.target.innerHTML)).toString())
        }
        setFinalResult(true)
    }

    const clear = () => {
        setClickValue("0")
        setResult("")
    }

    const erase = () => {
        if(clickValue.length ===1) {
            setClickValue("0")
        } else {
            setClickValue(clickValue.slice(0, -1))
        }
    }

    const compute = () => {
        let answer
        let num = parseFloat(result.slice(0, -1))
        let switcher = result.slice(-1)
        let den = +clickValue
        if (isNaN(den) || isNaN(num)) return
        switch (switcher) {
            case "+":
                answer = parseFloat(num) + den
                break
            case "-":
                answer = parseFloat(num) - den
                break
            case "/":
                answer = parseFloat(num) / den
                break
            case "*":
                answer = parseFloat(num) * den
                break
            default:
                return
        }
        return answer
    }

    const equals = () => {
        const answer = compute()
        setClickValue(answer.toString())
        setResult("")
        setFinalResult(false)
        
    }
    
    const periodClick = (e) => {
       if (clickValue.includes(".")) {
           return
       } else {
           updateNumberClick(e)
       }
    }

    const negate = () => {
        if (clickValue === "0" || finalResult === false) {
            return
        } else {
            setClickValue((-(parseFloat(clickValue))).toString()) 
        }

    }

    const percent = () => {
        if (result !== "") {
            equals()
            setClickValue((+clickValue/100).toString())
        } else {
            setClickValue((+clickValue/100).toString())
        }
    }

    const squareRoot = () => {
        if (result !== "") return
        setClickValue((Math.sqrt(+clickValue)).toString())
        // modifyDisplay()
    }

    const updateOperandClick = (e) => {
        if (result !== "") {
            const answer = compute()
            setResult(answer+(e.target.name))
            setClickValue("0")

        } else {
            setClickValue("0")
            setResult(clickValue+(e.target.name))
        }
        
    }

    // const modifyDisplay = () => {
    //     const integer = clickValue.split(".")[0]
    //     const decimal = clickValue.split(".")[1]
    //     let  integer2 = (+integer.toLocaleString("en-US", {maximumFractionDigits: 10})).toString()
    //     if (decimal != null) {
    //         setClickValue(integer2+decimal)
    //     } else {
    //         setClickValue(integer2)
    //     }
    // }

    
    return (
        <>
        <Display result1={clickValue} result2={result}/>
        <div className="keypad">
            <button id="delete"onClick={clear}>AC</button>
            <button onClick={squareRoot}>√</button>
            <button onClick={percent}>%</button>
            <button id="delete" onClick={erase}>DEL</button>
            <button onClick={updateNumberClick}>1</button>
            <button onClick={updateNumberClick}>2</button>
            <button onClick={updateNumberClick}>3</button>
            <button name="/" onClick={updateOperandClick}>÷</button>
            <button onClick={updateNumberClick}>4</button>
            <button onClick={updateNumberClick}>5</button>
            <button onClick={updateNumberClick}>6</button>
            <button name="*" onClick={updateOperandClick}>&times;</button>
            <button onClick={updateNumberClick}>7</button>
            <button onClick={updateNumberClick}>8</button>
            <button onClick={updateNumberClick}>9</button>
            <button name="-" onClick={updateOperandClick}>&ndash;</button>
            <button onClick={periodClick}>.</button>
            <button onClick={updateNumberClick}>0</button>
            <button onClick={negate}>+/-</button>
            <button name="+" onClick={updateOperandClick}>+</button>
            <button className="span-two-columns">HISTORY</button>
            <button onClick={equals} className="span-two-columns">=</button>
        </div>
        </>
    )
}

export default NumberKeys