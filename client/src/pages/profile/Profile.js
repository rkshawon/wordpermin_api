import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { Context } from '../../contex/AuthContex';
import Loding from '../Loding';
import './profile.css'
import img from './t2.jpg'

function Profile() {
  const {user} = useContext(Context)
  const [displayName, setName] = useState('')
  const [displayEmail, setEmail] = useState('')
  const [scores, setScores] = useState([])
  const name = useRef()
  const email = useRef()
  const pass = useRef()
  const confPass = useRef()
  const [average, setAverage] = useState(0)
  const [isfatching, setIsfatching] = useState(true)

  useEffect(()=>{
    axios.get(`user/profile/${user._id}`)
    .then(user=>{
      setName(user.data.name)
      setEmail(user.data.email)
      const sortedScore = user.data.score.sort((a, b)=>{
        return b - a;
      })
      const sum = sortedScore.reduce((partialSum, a) => partialSum + a, 0);
      const average = Math.floor( sum/sortedScore.length);
      setAverage(average)
      console.log(average);
      setScores(sortedScore)
      setIsfatching(false)
      //console.log("user data", user.data,"score",  scores);
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
      pass: pass.current.value
    }
    axios.put(`./user/update/${user._id}`, updatedInfo)
    .then(info=>{
      console.log(info);
    })
    .catch(err=>{
      console.log(err);
    })
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
            <input type = 'text' className='profileInputText' placeholder={displayName} ref = {name}/>
            <input type = 'email' className='profileInputEmail' placeholder={displayEmail} ref={email}/>
            <input type = 'password' className='profileInputPassword' placeholder="Password" ref={pass}/>
            <input type = 'password' className='profileInputPassword' placeholder="Confirm Password" ref={confPass}/>
            <button className = "updateBtn" onClick={updateInformation}>Update</button>
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
          )}): <Loding/>}
        </div>
    </div>
  </div>
)}

export default Profile;
