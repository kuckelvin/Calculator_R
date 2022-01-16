import Display from "./Display.js"
import { useState } from "react"
import { FaBackspace, FaEquals, FaMinus, FaPlus, FaPercent, FaSquareRootAlt, FaDivide, FaTimes} from "react-icons/fa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'



const NumberKeys = () => {
    const [result, setResult] = useState("")
    const [clickValue, setClickValue] = useState("0")
    const [finalResult, setFinalResult] = useState(true)
    const [history, setHistory] = useState("")

    const updateNumberClick = (e) => {
        if (finalResult && clickValue ==="0"){
            setClickValue((parseFloat(clickValue)+parseFloat(e.target.innerHTML)).toString())
        } else if (finalResult && clickValue !== "0") {
            setClickValue(clickValue+(e.target.innerHTML))
        } else {
            setClickValue((parseFloat(e.target.innerHTML)).toString())
        }
        setFinalResult(true)
        maxDigits()

    }

    const maxDigits = () => {
        if (clickValue.length === 24) {
            setClickValue(clickValue)
        }
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
        setHistory(answer.toString())
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
        
    }

    const updateOperandClick = (e) => {
        if (result !== "") {
            const answer = compute()
            setResult(answer+(e.target.name))
            setClickValue("0")
            setHistory(answer.toString())
        } else {
            setClickValue("0")
            setResult(clickValue+(e.target.name))
        }
        
    }

    const showAns = () => {
        setClickValue(history)
    }

    
    // const modifyDisplay = () => {
    //     const integer = clickValue.split(".")[0]
    //     const decimal = clickValue.split(".")[1]
    //     console.log("decimal", decimal, typeof(decimal))
    //     console.log("integer", integer, typeof(integer))
    //     let  integer2 = parseFloat(integer).toLocaleString("en-US", {maximumFractionDigits: 10})
    //     console.log("integer2", integer2)
    //     if (decimal != null) {
    //         setClickValue(integer2+"."+decimal)
    //     } else {
    //         setClickValue(integer2)
    //     }
    // }
    

    return (
        <>
        <Display result1={clickValue} result2={result}/>
        <div className="keypad">
            <button id="delete"onClick={clear}>AC</button>
            <button style={{color: "grey"}} onClick={squareRoot}><FaSquareRootAlt /></button>
            <button style={{color: "grey"}} onClick={percent}><FaPercent /></button>
            <button id="delete" onClick={erase}><FaBackspace /></button>
            <button className="numberKey" onClick={updateNumberClick}>1</button>
            <button className="numberKey" onClick={updateNumberClick}>2</button>
            <button className="numberKey" onClick={updateNumberClick}>3</button>
            <button name="/" style={{color: "grey"}} onClick={updateOperandClick}><FaDivide /></button>
            <button className="numberKey" onClick={updateNumberClick}>4</button>
            <button className="numberKey" onClick={updateNumberClick}>5</button>
            <button className="numberKey" onClick={updateNumberClick}>6</button>
            <button name="*" style={{color: "grey"}} onClick={updateOperandClick}><FaTimes /></button>
            <button className="numberKey" onClick={updateNumberClick}>7</button>
            <button className="numberKey"  onClick={updateNumberClick}>8</button>
            <button className="numberKey" onClick={updateNumberClick}>9</button>
            <button name="-" style={{color: "grey"}} onClick={updateOperandClick}><FaMinus /></button>
            <button className="numberKey" onClick={periodClick}>.</button>
            <button className="numberKey" onClick={updateNumberClick}>0</button>
            <button className="numberKey" onClick={negate}><FontAwesomeIcon icon={solid("plus-minus")} /></button>
            <button name="+" style={{color: "grey"}} onClick={updateOperandClick}><FaPlus /></button>
            <button id="ans" className="span-two-columns" onClick={showAns}>ANS</button>
            <button id="equals" onClick={equals} className="span-two-columns"><FaEquals /></button>
        </div>
        </>
    )
}

export default NumberKeys