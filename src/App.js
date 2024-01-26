import React, { useState } from 'react'
import './App.css'
import Bright from './Images/brightness.png';
import Dark from './Images/light.png';
import Show_Input_Out from './components/Show_Input_Out';
import KeyPad from './components/KeyPad';


const App = () => {
   
  const [isDark,setDark] = useState(false);


  return (
    <div className='container'>
       <div className='calculator'>
       <div className='navbar'>
       <div className='navbar_button' onClick={()=>setDark(!isDark)}>
           <div className={`toggle_circle ${isDark ? "toggle_circle_active" : ""} `}></div>
           
       </div>
       <img src={isDark ? Dark : Bright} alt='Mode'></img>
       </div>

        <Show_Input_Out/>
        <KeyPad/>
       </div>
    </div>
  )
}

export default App
