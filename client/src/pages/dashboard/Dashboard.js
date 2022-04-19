import React, {useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid'
import './dashboard.css'
import Loding from '../Loding';


function Dashboard() {
    const [allUser, setAlluser] = useState([])
    const [isfatching, setIsfatching] = useState(true)

    const fetchAllUser = ()=>{
      axios.get("/user/dashboard")
      .then(users=>{
        setAlluser(users.data)
        setIsfatching(false)
      })
      .catch(err=>{
        console.log(err);
      })
    }
    useEffect(()=>{
      fetchAllUser()
      
    }, [])
      return <div className='dashboard'>
      <div className="title">
      Top 20 users with highest WPM:
      </div>
      <div className="tableContainer">
         {!isfatching ? <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          { allUser.map((user, index)=>{
            const scoredData = (arr)=>{
              arr.sort((a, b)=>{
                return b - a
              })
            }
            scoredData(user.score);
            return(
              <tr key={uuid()}>
                <td>{ index + 1}.</td>
                <td>{user.name}</td>
                <td>{user.score[0]}</td>
              </tr>
            )
          })}
          </tbody>
        </table> :<Loding/>}
      </div> 
    </div>;
}

export default Dashboard;
