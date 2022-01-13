

const Display = ({result1, result2}) => {

    return (
        <div className="display">
            <div className="previous-operand">{result2}</div>
            <div className="current-operand">{result1}</div>
        </div>
    )
}

export default Display
