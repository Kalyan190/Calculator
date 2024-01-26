import React, { useEffect, useState } from 'react'
import './App.css'
import Bright from './Images/bright.png';
import Dark from './Images/night-mode.png';
import Show_Input_Out from './components/Show_Input_Out';
import KeyPad from './components/KeyPad';


const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];


const App = () => {
   
  const [isDark,setDark] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false);
  const [expression , setExpression] = useState("");
  const [result,setResult] = useState("");

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );


  const handleKeyPress = (keyCode, key) => {
    console.log(keyCode,key);

    if (key === "AC" || keyCode === 67) {
      setExpression("");
      setResult("");
      setHistory([]);
      return;
    }

    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };
 
  useEffect(()=>{
    localStorage.setItem("calculator-app-mode",JSON.stringify(isDark))
  },[isDark])

  useEffect(()=>{
    localStorage.setItem("calculator-app-history",JSON.stringify(history))
  },[history])

  return (
    <div className='container' data-theme={isDark?"dark":""} tabIndex="0" onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)} >
       <div className='calculator' >
       <div className='navbar'>
       <div className='navbar_button' onClick={()=>setDark(!isDark)}>
           <div className={`toggle_circle ${isDark ? "toggle_circle_active" : ""} `}></div>
           
       </div>
       <img src={isDark ? Dark : Bright} alt='Mode'></img>
       </div>

        <Show_Input_Out expression = {expression} result={result} history={history}/>
        <KeyPad handleKeyPress={handleKeyPress}/>
       </div>
    </div>
  )
}

export default App
