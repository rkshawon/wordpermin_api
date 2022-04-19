import React, { useContext } from 'react';
import "./topbar.css"
import { NavLink  } from "react-router-dom";
import { Context } from '../../contex/AuthContex';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Topbar() {
  const {user, dispatch} = useContext(Context)

  const logOut = ()=>{
    dispatch({type: "LOGOUT"})
  }

  return <div className='topbar'>
    <div className="logo">WordsPerMin</div>

    <div className="rightSide">
      <NavLink  to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}><div><span><HomeIcon/></span>Home</div></NavLink >
      <NavLink  to="/dashboard" style={{ color: 'inherit', textDecoration: 'inherit'}}><div><span><LineStyleIcon/></span>Dashboard</div></NavLink >
      {user && <NavLink  to ="/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}><div><span><PersonIcon/></span>Profile</div></NavLink >}
      {!user?
      <NavLink  to ="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}><div><span><LoginIcon/></span>Login / Register</div></NavLink > :
      <NavLink  to ="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><div onClick={logOut}><span><LogoutIcon/></span>Logout</div></NavLink >}
    </div>
  </div>;
}

export default Topbar;

