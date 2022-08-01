import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import style from './Navbar.module.scss'

export default function Navbar(props) {
  console.log(props);
  
  return (
    <>
    <nav className={`${style.navBg} navbar navbar-expand-lg`}>
  <div className="container-fluid">
    <a className={`navbar-brand text-white fw-bold`}>Noxe</a>
    <button className={`navbar-toggler ${style.togglerFocus}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className={`navbar-toggler-icon ${style.toggler}`}>
      <i className="fa-solid fa-bars text-white"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {props.userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
        <li className="nav-item">
        
          <Link className={`nav-link ${style.linkColor}`}  to='home'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${style.linkColor}`} to='movies'>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${style.linkColor}`} to='tvshows'>Tv Shows</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${style.linkColor}`} to='people'>People</Link>
        </li>
      </ul>:''}
      

       
       

      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0"> 
      <div className="social-icons d-flex align-items-center d-sm-none d-lg-flex">
       <i className={`fa-brands fa-facebook mx-2 ${style.linkColor}`}></i>
       <i className={`fa-brands fa-spotify mx-2 ${style.linkColor}`}></i>
       <i className={`fa-brands fa-instagram mx-2 ${style.linkColor}`}></i>
       <i className={`fa-brands fa-youtube mx-2 ${style.linkColor}`}></i>
       </div>
        
        {props.userData?
        <li className="nav-item">
          <a onClick={props.logout} className={`nav-link ${style.linkColor}`}>Logout</a>
        </li>:
        <>
        <li className="nav-item">
          <Link className={`nav-link ${style.linkColor}`} to='register'>Register</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${style.linkColor}`} to='login'>Login</Link>
        </li>
        </>}
        
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
