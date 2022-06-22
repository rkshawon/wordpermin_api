import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { Context } from '../../contex/AuthContex';
import Loding from '../Loding';
import './profile.css'
import img from './profile.png'

function Profile() {
  const {user} = useContext(Context)
  const [displayName, setName] = useState('')
  const [displayEmail, setEmail] = useState('')
  const [scores, setScores] = useState([])
  const name = useRef()
  const email = useRef()
  const [average, setAverage] = useState(0)
  const [isfatching, setIsfatching] = useState(true)
  const password = useRef();
  const confirmPassword = useRef();
  const [errorMessageName, setErrorMessageName] = useState('')
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePass, setErrorMessagePass] = useState('')
  const [errorMessagePass2, setErrorMessagePass2] = useState('')
  const [serverError, setServerError] = useState('')
  let ename, eemail, epass, epass2 = true

  const nameCheck = ()=>{
    const validateName=()=>{
      if(String(name.current.value).match(/^[a-zA-Z\-]+$/))
        return true
      else
        return false
    }
    if(!validateName()){
      ename = true
      setErrorMessageName("Only Characters A-Z, a-z and '-' are  acceptable.")
    }
    else{
      if(name.current.value.length > 10){
        ename = true
        setErrorMessageName("Name must be less than 10 characters")
      }
      else{
        ename = false
        setErrorMessageName("")
      }
    }
  }
  const emailCheck = ()=>{
    const validateEmail = () => {
      if(String(email.current.value).match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
        return true
      else
        return false
    };
   
    if(!validateEmail()){
      eemail = true
      setErrorMessageEmail("Email is not valid")
    }
    else{
      eemail = false
      setErrorMessageEmail("")
    }
  }
  const passCheck = ()=>{
    if(password.current.value?.length <6){
      epass = true
      setErrorMessagePass("Password can not be less than 6 character")
    }
    else{
      epass = false
      setErrorMessagePass("")
    }
  }
  const pass2Check = ()=>{
    if(password.current.value === confirmPassword.current.value){
      epass2 = false
      setErrorMessagePass2("")
    }
    else{
      epass2 = true
      setErrorMessagePass2("Password does not match")
    }
  }

  const formValidation = ()=>{
    if(name.current.value ===''){
      ename = true
      setErrorMessageName("Name can not be empty")
    }
    else{
      nameCheck()
    }
    
  
    if(email.current.value ===''){
      eemail = true
      setErrorMessageEmail("Email can not be empty")
    }
    else{
      emailCheck()
    }
      
    
    if(password.current.value ===''){
      epass = true
      setErrorMessagePass("Password can not be empty")
    }
    else{
      passCheck()
    }
    
    if(confirmPassword.current.value ===''){
      epass2  =true
      setErrorMessagePass2("Confirm Password can not be empty")
    }
    else{
      pass2Check()
    }
  }


  const errorContainer = ()=>{
    if(ename || eemail || epass || epass2)
      return true
    else
      return false
  }

  useEffect(()=>{
    axios.get(`user/profile/${user?._id}`)
    .then(user=>{
      setName(user.data.name)
      setEmail(user.data.email)
      const sortedScore = user.data.score.sort((a, b)=>{
        return b - a;
      })
      const sum = sortedScore.reduce((partialSum, a) => partialSum + a, 0);
      const average = Math.floor( sum/sortedScore.length);
      setAverage(average)
      setScores(sortedScore)
      setIsfatching(false)
    })
    .catch(err=>{
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updateInformation = (e)=>{
    e.preventDefault()

    const updatedInfo = {
      name: name.current.value,
      email: email.current.value,
      pass: password.current.value
    }
    formValidation()
    try{
      if(!errorContainer()){
      axios.put(`./user/update/${user._id}`, updatedInfo)
    }}
    catch(err){
      setServerError("Something went wrong")
    }
  }
  return(
    <div className="profilePage">
      <div className="leftProfile">
        <div className="leftUpper">
            <img src = {img} alt = ""/>
            <h3>{displayName}</h3>
        </div>
        <div className="leftLower">
          <h2>Update Information</h2>
            <input type = 'text' className='profileInputText' placeholder={displayName} ref = {name}
            onClick= {()=>{setErrorMessageName(''); setServerError('')}}/>
            <small >{errorMessageName}</small>
            <input type = 'email' className='profileInputEmail' placeholder={displayEmail} ref={email}
            onClick= {()=>{setErrorMessageEmail(''); setServerError('')}}/>
            <small >{errorMessageEmail}</small>
            <input type = 'password' className='profileInputPassword' placeholder="Password" ref={password}
            onClick= {()=>{setErrorMessagePass(''); setServerError('')}}/>
            <small >{errorMessagePass}</small>
            <input type = 'password' className='profileInputPassword' placeholder="Confirm Password" ref={confirmPassword}
            onClick= {()=>{setErrorMessagePass2(''); setServerError('')}}/>
            <small >{errorMessagePass2}</small>
            <button className = "updateBtn" onClick={updateInformation}>Update</button>
            <small className="small">{serverError}</small>
        </div>
    </div>
    <div className="rightProfile">
        <div className="rightUpper">
            <h2>Highest Score: <span>{scores[0]}</span> </h2>
            <h3>Avarage : <span>{average}</span></h3>
        </div>
        <div className="rightLower">
            <h3>History</h3>
            <div className="singleUserScoreBoard">
                <h4>No</h4>
                <h4>Top 10</h4>
            </div>
            {!isfatching ? scores && scores.map((score, index)=>{
              return(
                <div className="historyRecord" key={uuid()}>
                  <h4>{index + 1}.</h4>
                  <h4>{score}</h4>
            </div>
          )}
          ): <Loding/>}
        </div>
    </div>
  </div>
)}

export default Profile;
