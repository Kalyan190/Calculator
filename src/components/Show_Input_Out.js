import React,{useEffect, useRef} from 'react'
import './ShowInpOut.css'

const Show_Input_Out = (props) => {
  const ans_ref = useRef();
  const expressionRef = useRef();
  
  useEffect(()=>{
    ans_ref.current.scrollIntoView()
  },[props.history]);

  useEffect(()=>{
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  },[props.expression])

  return (
    <div className='inp_out custom-scroll'>
      <div className='inp_out_history'>
      {
       props.history && props.history?.map((item)=>(<p key={item + Math.random()*44}>{item}</p>))

      }
      </div>
      <br/>
      <div ref={expressionRef}  className='inp_out_exp custom-scroll'>
      <p>{props.expression}</p>
      </div>
      <p ref={ans_ref} className='inp_out_ans'>{props.result}</p>
    </div>
  )
}

export default Show_Input_Out
