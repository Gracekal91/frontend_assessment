import './App.css';
import {useState, useRef} from "react";

function App() {
    const [firstNumber, setFirstNumber] = useState(null)
    const [secondNumber, setSecondNumber] = useState(null)
    const [operator, setOperator] = useState('')
    const [result, setResult] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    const operatorRef = useRef('');

    const handleClick = (event) => {
        const updatedOperator = event.target.value;
        operatorRef.current = updatedOperator;
        console.log(operatorRef.current);
    };

    const isNumber = (input) => {
        const regex = /^\d+$/;
        return regex.test(input);
    }


    const reset = () =>{
        setSecondNumber(null)
        setFirstNumber(null)
        operatorRef.current = '';
    }

    const handleResult = (event) =>{
        if(event.key === 'Enter'){
            const result = eval(`parseInt(${firstNumber}) ${operatorRef.current} parseInt(${secondNumber})`);
            setResult(result)
            console.log(result)
            reset()
        }
    }

    const updateNumbers = (event) => {
        let num = event.target.value;
        let isNumberValid = true;
        const regex = /^\d+$/;

        for (let char of num) {
            if (!regex.test(char)) {
                isNumberValid = false;
                break;
            }
        }

        if (isNumberValid) {
            setIsDisabled(false);
            setErrorMsg('');

            if (operatorRef.current === '') {
                setFirstNumber(num);
                console.log('First number:', firstNumber);
            } else {
                setSecondNumber(num);
                console.log('Second number:', secondNumber);
            }
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
                  <input type="text" className='input_screen' onChange={updateNumbers} onKeyPress={handleResult}/>
                  {
                      errorMsg && <span className='error-msg'> {errorMsg} </span>
                  }
                  <div>
                  <button value='+' onClick={handleClick}  disabled={isDisabled}>+</button>
                  <button value='-' onClick={handleClick} disabled={isDisabled}>-</button>
                  <button value='*' onClick={handleClick} disabled={isDisabled}>*</button>
                  <button value='/' onClick={handleClick} disabled={isDisabled}>/</button>
                  </div>
              </div>
              <div className="calculator_result">
                  <span style={{display: 'block'}}>{firstNumber}{operatorRef.current}{secondNumber}</span>
                  <span>Result: {result}</span>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
