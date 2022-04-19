import React, {useState, useEffect, useRef, useContext} from 'react';
import "../home.css"
import {Words} from './Words'
import uuid from 'react-uuid'
import Result from '../../components/result/Result';
import Display from '../Display';
import axios from 'axios';
import { Context } from '../../contex/AuthContex';

function Common() {
    const [input, setInput] = useState("")
    const [singleChar, setSinglechar] = useState('')
    const [display, setDisplay] = useState([''])
    const [displaySecond, setDisplaySecond] = useState([])
    const [counter, setCounter] = useState(0)
    const [rightWords, setRightWords] = useState(0)
    const [wrongWords, setWrongWords] = useState(0)
    const [leftPointer, setLeftPointer] = useState(0)
    const [wordCounter, setWordCounter] = useState(1)
    const [startPointer, setStartPointer] = useState(0)
    const [midPointer, setMidPointer] = useState(startPointer + 10)
    const [timer, setTimer] = useState(60)
    const [indexController, setIndexcontroller] = useState(0)
    const [keystroke, setKeystroke] = useState(0)
    const [timerOn, setTimerOn] = useState(false)
    const [firstInput, setFirstInput] = useState(false)
    const [resultUiTriger, setResultUiTriger] = useState(false)
    const [redcolorTrigger, setRedcolorTRigger] = useState(false)
    const [greencolorTrigger, setGreencolorTRigger] = useState(false)
    const [wordBackcolor, setWordbackColor] = useState(false)
    const [colorHolder, setColorholder] = useState('')
    const [classes, setClasses] = useState([]);
    const [resultData, setResultData] = useState({})
    const [wordIndicator, setWordIndicator] = useState(0)
    const inputRef = useRef()
    const {user} = useContext(Context)
   
    
    useEffect(()=>{
        const resutlUi = ()=>{
            setResultData({wpm: rightWords, totalWord: counter, wrongWord: wrongWords, keyStroke: keystroke})
        }
        resutlUi()
        randomNumber()
        setGreencolorTRigger(false)
        setRedcolorTRigger(false)
        postScore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resultUiTriger])
    
    const postScore = async ()=>{
        resultUiTriger && await axios.put(`/user/score/${user._id}`,{sc: rightWords})
    }

    useEffect(()=>{
        //console.log('e called');
        let interval = null
        let timerCounter = 60
        setTimer(60)
        if(timerOn){
            interval = setInterval(()=>{
                if(timerCounter>50){
                    timerCounter = timerCounter - 1
                    setTimer(prevTimer => prevTimer - 1)
                    //console.log(timerCounter);
                }
                else{
                    clearInterval(interval)
                    setTimer(60)
                    setResultUiTriger(true)
                }
            },1000)
        }
        else{
            clearInterval(interval)
        }
        return () => clearInterval (interval)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ firstInput ])
    const randomNumber = ()=>{
        let randomValue = Math.floor(Math.random() * (500  - 0 ) + 0)
        setLeftPointer(randomValue)
        setStartPointer(randomValue)
        setMidPointer(randomValue + 10)
        //console.log(startPointer)
    }
    const reStart = ()=>{
        randomNumber()
        setInput('')
        setTimerOn(false)
        setFirstInput(false)
        setResultUiTriger(false)
        setWordbackColor(false)
        setWordCounter(1)
        setCounter(0)
        setRightWords(0)
        setWrongWords(0)
        setKeystroke(0)
        setIndexcontroller(0)
        setWordIndicator(0)
        setClasses([])
        inputRef.current.focus()
    }
    useEffect(()=>{
        const wordDisplay = ()=>{
            setDisplay([])
            setDisplaySecond([])
            for(let i = startPointer; i<startPointer + 10; i++){
                setDisplay(display => [...display, Words[i]])
                //console.log("start", startPointer,"mid", midPointer);
            }
            for(let i = midPointer; i<midPointer + 10; i++){
                setDisplaySecond(displaySecond => [...displaySecond, Words[i]])
                //console.log("mid", midPointer);
            }
        }
        wordDisplay()
        inputRef.current.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startPointer, midPointer])

    const wordCheck = ()=>{
        //console.log("input", input,"words", Words[leftPointer])
        if(input.trim() === Words[leftPointer].trim()){
            setRightWords(rightWords + 1)
            setGreencolorTRigger(true)
            setRedcolorTRigger(false)
            setIndexcontroller(prevIndex => prevIndex + 1)
            setClasses(sc => [...sc, 'greenword'])

            //setColorTRigger(false)
            //console.log("r",rightWords, "left", leftPointer);
        }
        else{
            setWrongWords(wrongWords + 1)
            setRedcolorTRigger(true)
            setGreencolorTRigger(false)
            setIndexcontroller(prevIndex => prevIndex + 1)
            setClasses(sc => [...sc, 'redword'])
            //console.log(colorswitch);
            //console.log("Words", Words[leftPointer], "leftPointer", leftPointer);
            //console.log("w",wrongWords, "left", leftPointer);
        }
    }
    useEffect(()=>{
        const checkSingleCharacter = ()=>{
            let len = 0
            if(singleChar !== " "){
                len =  singleChar.trim().length
            }
            
           //console.log("State ", display);
           //console.log("dis--", display[wordIndicator].substring(0, len), "single--", singleChar, "len--", len);
            if(display[wordIndicator].substring(0, len) === singleChar.trim()){
                //console.log(display[wordIndicator].substring(0, len), singleChar);
                setColorholder('wordbackground')
                setWordbackColor(false)
            }else{
                setColorholder('redbackground')
                if(singleChar !== " "){
                    setWordbackColor(true)
                }else{
                    setWordbackColor(false)
                }   
            }
        }
        checkSingleCharacter()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleChar])

    function onlySpaces(str) {
        return str.trim().length === 0;
    }
    const handleInputText = (e)=>{
        if(!onlySpaces(e.target.value)){
            setFirstInput(true)
            setKeystroke(prevKey => prevKey + 1)
        }
        setSinglechar(e.target.value)
        setTimerOn(true)
        setInput(e.target.value)
        //console.log(firstInput);
    }
    useEffect(()=>{
        setGreencolorTRigger(false)
        setRedcolorTRigger(false)
        setClasses([])
        setIndexcontroller(0)
    },[startPointer])
    const clearInput = (e)=>{
        if( e.keyCode === 32 && !onlySpaces(input) && (timer>55 || timer !== 60) ){
            setCounter(preCounter => preCounter + 1)
            setLeftPointer(prevleftPointer => prevleftPointer + 1)
            //console.log("counter",counter);
            setWordCounter(prevWordCounter => prevWordCounter + 1)
            ///console.log(input)
            //console.log("start",startPointer,"wordCounter", wordCounter)
            
            if(wordCounter === 10){ 
                 setStartPointer(prevStartPointer => prevStartPointer + 10)
                 setMidPointer(prevMidPointer => prevMidPointer + 10)
                 setWordCounter(1)
                 setWordbackColor(false)
                 setWordIndicator(-1)
                 //console.log("start",startPointer,"wordCounter", wordCounter)
            }
            //console.log("Words", Words[leftPointer], "leftPointer", leftPointer);
            wordCheck()
            setInput("")
            setWordIndicator(prevWordIndicator=>prevWordIndicator + 1)
        }
    }
  return (
      <div className='container'>
        <div className="display_input">
            <div className="display">
                <div className="firstLine">
                    {<Display 
                        display={display}
                        indexController={indexController}
                        redcolorTrigger={redcolorTrigger}
                        greencolorTrigger={greencolorTrigger}
                        wordBackcolor={wordBackcolor}
                        classes={classes}
                        colorHolder={colorHolder}
                    />}
                </div>
                <div className="secondLine">
                    {displaySecond.map((wordSecond)=>{
                        return(<span  key={uuid()} className = "singleWord">{wordSecond}</span>)  
                })}
                </div>
            </div>
            <div className="input_area">
            <input className= {resultUiTriger ? 'input inputDisplay' : "input"} 
                type = "text" placeholder='Start Typing'
                ref= {inputRef}
                value={input}
                onChange = {handleInputText}
                onKeyDown = {clearInput}
            />
            <button className="button" onClick={reStart}>Restart</button>
            <div className="timer"><div className='time'>00 : {timer}</div></div>
            </div>
        </div>
        <Result data = {resultData}/>
      </div>
      );
}

export default Common