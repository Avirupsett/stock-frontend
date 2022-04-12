import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/font.css';
import { useLocation } from 'react-router-dom';
import Frame from '../assets/Slice.png';

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{backgroundImage:'linear-gradient( to right bottom,#0f0c29,#1b1951,#32227b,#5126a5,#7823ce)'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <img src={Frame} alt="📋 STOCK DECK" width="200px" height="40px" className="d-inline-block align-text-top"/>
     
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{fontSize:18,fontFamily:'Montserrat',paddingRight: '170px'}}>
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{paddingRight:'25px'}}>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">💠Balance</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/details'?"active":""}`} aria-current="page" to="/details">💠Details</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" target={"_blank"} rel="noreferrer" href="http://localhost:1337/admin/plugins/content-manager/collectionType">💠Entries</a>
        </li>
        
      </ul>
    
    </div>
      
  </div>
</nav>
  )
}
