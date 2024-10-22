import React from 'react'
import logoPusheen from '../assets/logo-pusheen.png'
import '../styles/Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <img className='logoHeader' src={logoPusheen} alt="logo" />
        <h1 className='title'>BLOG</h1>
        <Link to="/" className='nav'>Accueil</Link>
    </div>
  )
}

export default Header