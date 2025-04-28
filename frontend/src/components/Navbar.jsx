import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const products = useSelector((state)=>state.cart.products);
  console.log(products)
  const [isCartOpen, setisCartOpen] = useState(false);
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen)
  }

const dispatch = useDispatch();
const {user}= useSelector((state)=> state.auth)
// console.log(user)

const [logoutUser] = useLogoutUserMutation();
const navigate = useNavigate()

//Dropdown menu
const [isDropDownOpen, setIsDropDownOpen] = useState (false)
const handDropDownToggle = () =>{
  setIsDropDownOpen(!isDropDownOpen)
}

//admin dropdown
const adminDropDownMenus =[
  {label:"Adminpanel", path:"/dashboard/admin"},
  {label:"Hantera Produkter", path:"/dashboard/manage-products"},
  {label:"Alla Beställningar", path:"/dashboard/manage-orders"},
  {label:"Skapa Ny", path:"/dashboard/add-new-post"},
]

//user dropdown
const userDropDownMenus= [
  {label:"Mitt Konto", path:"/dashboard"},
  {label:"Profil", path:"/dashboard/profile"},
  {label:"Betalningar", path:"/dashboard/payments"},
  {label:"Beställningar", path:"/dashboard/orders"},
]

const dropDownMenus = user?.role ==='admin' ? [...adminDropDownMenus]: [...userDropDownMenus]

const handleLogout = async () => {
  try {
    await logoutUser().unwrap();
    dispatch(logout());
    navigate("/");
  } catch (error) {
    console.error("Misslyckades med att logga ut", error);
  }
};

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
        <button onClick={handleCartToggle} className='hover:text-primary'>
        <i className="ri-shopping-bag-line"></i>
        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
        </button>
      </span>
<span>
{
  user ? (
    <>
      <img 
        onClick={handDropDownToggle}
        src={user?.profileImage || avatarImg} 
        alt='' 
        className="size-6 rounded-full cursor-pointer" 
      />

      {isDropDownOpen && (
        <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
          <ul className='font-medium space-y-4 p-2'>
            {dropDownMenus.map((menu, index) => (
              <li key={index}>
                <Link 
                  onClick={() => setIsDropDownOpen(false)}
                  className='dropdown-items' 
                  to={menu.path}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
            <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
          </ul>
        </div>
      )}
    </>
  ) : (
    <Link to="/login">
      <i className="ri-user-line"></i>
    </Link>
  )
}

</span>
    </div>

    </nav>
    {
      isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
    }
    </header>
  )
}

export default Navbar