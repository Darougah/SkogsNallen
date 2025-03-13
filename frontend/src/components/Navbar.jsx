import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='fixed-nav-bar w-nav'>
    <nav className='max-w-screen-2x1 mx-auto px-4 flex justify-between items-center'>
      <ul className='nav__links'>
      <li className='link'>
            <Link to="/">Hem</Link>
          </li>
          <li className='link'>
            <Link to="/Shop">Butik</Link>
          </li>
          <li className='link'>
            <Link to="/Pages">Sidor</Link>
          </li>
          <li className='link'>
            <Link to="/contact">Kontakt</Link>
          </li>
      </ul>
      {/* Logo */}
      <div className='nav__logo' >
        <Link to="/">SkogsNallen<span>.</span></Link>
      </div>
      {/* nav icons */}
    <div className='nav__icons relative'>
      <span>
        <Link to="/search"><i className="ri-search-line"></i></Link>
      </span>
      <span>
        <button className='hover:text-primary'>
        <i className="ri-shopping-bag-line"></i>
        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>0</sup>
        </button>
      </span>
      <span>
        <Link to="login">
        <i class="ri-user-line"></i></Link>
      </span>
    </div>

    </nav>
    </header>
  )
}

export default Navbar