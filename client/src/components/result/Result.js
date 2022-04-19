import React, { useEffect, useState } from 'react';
import './result.css';

function Result({data}) {
  const [accuracy, setAccuracy] = useState(0)
  useEffect(()=>{
    setAccuracy(Math.floor((data.wpm/data.totalWord)*100))
  },[data.wpm])
  
  return <div className = "result">
    <div className="wpm"> WPM:  {data.wpm} <span className='wpmspan'>(words per minute)</span></div>
    <div className="total">
        <div className="totalwords">Total Words: {data.totalWord}</div>
        <div className="accuracy">Accuracy: {accuracy? accuracy: 0} %</div>
    </div>
    <div className="rightWrong">
        <div className="right">Right Words: <span className='rightspan'>{data.wpm }</span></div>
        <div className="wrong">Wrong Words: <span className='wrongspan'>{data.wrongWord}</span></div>
        <div className="keystrocke"><span className='keystrockespan'>KeyStrokes: </span>{data.keyStroke}</div>
    </div>
  </div>
}

export default Result;

