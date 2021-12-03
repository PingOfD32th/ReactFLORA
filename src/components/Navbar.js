import React, { useState, useEffect, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { CartContext } from '../context/cartContext';
import Checkout from '../pages/checkout'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { cart, removeCart } = useContext(CartContext);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar-wrapper'>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {//TODO, loop through checking permissions
              SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='navbar'>
            <Link to='/checkout' className='menu-bars shopping' >
              <FaIcons.FaShoppingCart />
              <span className="menu-item-count">{cart && cart.qty}</span>
              <div className="shopping-item">
                {cart && cart.item.length == 0 &&
                <div className="dropdown-cart-header">
                    <span>No Item on Cart</span>
                </div>}
                <div className="shopping-list">
                {cart && cart.item.length != 0 && cart.item.map(val => 
                  <div className="shopping-list-item">
                    <div>
                      <img src={val.img} alt={val.title} />
                    </div>
                    <div>
                      <h4>{val.title}</h4>
                      <p><div className="remove" onClick={e => removeCart(val.title, val.count)}>Remove</div><div>{val.count} x {val.price} = {(val.count * parseFloat(val.price)).toFixed(2)}</div></p>
                    </div>
                  </div>   
                )}               
                </div>
                <div className="bottom">
                  <div className="total">
                    <span>Total: </span>
                    <span className="total-amount">{cart && cart.total.toFixed(2)}</span>
                  </div>
                  <Link to='/checkout' className="btn animate" disabled="disabled">Checkout</Link>
                </div>
            </div>
            </Link>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
