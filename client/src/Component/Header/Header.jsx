import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../redux/store'
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [clicked, setClicked] = useState(false)
  let isLogin = useSelector(state => state.isLogin)
  isLogin = isLogin || localStorage.getItem("userId")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutBtn = () => {
    try {
      dispatch(authAction.logOut())
      navigate('/login')
      localStorage.clear();
    }
    catch (error) {
      console.log(error);
    }
  }


  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <>
      <nav className="container">
        <div className="header-icon" onClick={() => navigate("/")}>BLOG APP</div>
        <div id={"inputBox"}>
          <input type="text" placeholder='Search Blogs' />
          <span style={{float:'right', marginTop:'5px' }}><SearchIcon/> </span>
        </div>
        <div>
          <ul id="navbar" className={clicked ? "navbar active" : "navbar"}>
            <li><Link to="/" className='active'> All Blogs </Link></li>
            <li> <Link to="/my-blog">My Blog </Link></li>
            <li> <Link to="/create-new-blog">Create Blogs </Link></li>
            {
              !isLogin ? (
                <>
                  <li> <Link to="/login"> LOGIN</Link></li>
                  <li> <Link to="/register"> REGISTER</Link></li>
                </>
              )
                :
                <li> <Link to="#" onClick={logoutBtn} > LOGOUT</Link></li>
            }
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i onClick={() => setClicked(false)} className={clicked ? "fa-solid fa-xmark fa-beat-fade " : "fa-sharp fa-solid fa-bars"}></i>
        </div>
      </nav>
    </>
  )
}

export default Header