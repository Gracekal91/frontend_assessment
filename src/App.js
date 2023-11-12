import './App.css';
import { useState, useRef } from "react";
import * as math from 'mathjs';

function App() {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isOperatorClicked, setIsOperatorClicked] = useState(false);

    const operatorRef = useRef('');


    const handleOperatorClick = (value) => {
        setIsOperatorClicked(true);
        operatorRef.current = value;
        setOperator(operatorRef.current);
    };

    const resetCalculator = () => {
        setSecondNumber('');
        setFirstNumber('');
        operatorRef.current = '';
        setIsOperatorClicked(false);
        setErrorMsg('')
    };

    const handleResult = (event) => {
        if (event.key === 'Enter') {
            try {
                const result = math.evaluate(`${parseInt(firstNumber)} ${operatorRef.current} ${parseInt(secondNumber)}`);
                setResult(result);
                resetCalculator();
            } catch (error) {
                setErrorMsg('Invalid expression');
            }
        }
    };

    const handleNumberChange = (event, setNumber) => {
        const num = event.target.value;
        const isNumberValid = /^\d+$/.test(num);

        if (isNumberValid) {
            setNumber(num);
            setIsDisabled(false);
            setErrorMsg('');
        } else {
            setErrorMsg('Please enter a valid number');
        }
    };

    return (
        <div className="App">
            <div className="calculator_container">
                <div className="calculator_header"></div>
                <div className="content">
                    <div className="calculator_screen">
                        <input
                            value={isOperatorClicked ? secondNumber : firstNumber}
                            placeholder={isOperatorClicked ? "Enter number 2" : "Enter number 1"}
                            type="text"
                            className='input_screen'
                            onChange={(event) => isOperatorClicked ? handleNumberChange(event, setSecondNumber) : handleNumberChange(event, setFirstNumber)}
                            onKeyPress={handleResult}
                        />
                        {errorMsg && <span className='error-msg'>{errorMsg} <span className='reset-button' onClick={resetCalculator}>Reset</span>  </span>}
                        <div>
                            <button value='+' onClick={() => handleOperatorClick('+')} disabled={isDisabled}>+</button>
                            <button value='-' onClick={() => handleOperatorClick('-')} disabled={isDisabled}>-</button>
                            <button value='*' onClick={() => handleOperatorClick('*')} disabled={isDisabled}>*</button>
                            <button value='/' onClick={() => handleOperatorClick('/')} disabled={isDisabled}>/</button>
                        </div>
                    </div>
                    <div className="calculator_result">
                        <span style={{ display: 'block' }}>{firstNumber}{operatorRef.current}{secondNumber}</span>
                        <span>Result: {result}</span>
                    </div>
                </div>
                <small>Press enter to see the result</small>
            </div>
        </div>
    );
}

export default App;
