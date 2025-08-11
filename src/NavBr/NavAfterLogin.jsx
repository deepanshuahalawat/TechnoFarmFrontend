import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = token
    ? [
        { to: '/showsales', label: 'Sale' },
        { to: '/showPurchase', label: 'Purchase' },
        { to: '/ShowProduction', label: 'Production' },
        { to: '/ShowParty', label: 'Party' },
        { to: '/ShowProduct', label: 'Product' },
        { to: '/ShowComponent', label: 'Component' },
        { to: '/ShowEmployee', label: 'Employee' },
        { to: '/Other', label: 'Other' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Products' },
        { to: '/AboutUs', label: 'About Us' },
        { to: '/Services', label: 'Services' },
      ];

  return (<div></div>
    // <nav className="bg-gray-800 text-white p-4 relative z-50">
    //   <div className="container mx-auto flex items-center justify-between">
    //     <Link className="text-white text-2xl font-bold" to="/">
    //       TechnoFarm<span>.</span>
    //     </Link>

    //     {/* Mobile Menu Toggle Button */}
    //     <button
    //       className="text-white md:hidden focus:outline-none"
    //       onClick={toggleMobileMenu}
    //       aria-label="Toggle navigation"
    //     >
    //       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    //       </svg>
    //     </button>

    //     {/* Desktop Navigation */}
    //     <div className="hidden md:flex md:items-center md:space-x-4">
    //       {menuItems.map((item) => (
    //         <Link key={item.to} className="hover:text-gray-400" to={item.to}>{item.label}</Link>
    //       ))}
    //     </div>

    //     {/* User Icon */}
    //     <div className="hidden md:flex md:space-x-4">
    //       <Link className="hover:text-gray-400 flex gap-2" to={token ? '/profile' : '/login'}>
    //         <img src="/user.svg" alt="User" />
    //         <p>{token ? user?.userName : 'Login'}</p>
    //       </Link>
    //     </div>
    //   </div>

    //   {/* Mobile Navigation Menu */}
    //   <div
    //     className={`absolute top-full left-0 w-full bg-gray-900 text-white md:hidden transition-transform duration-300 ease-in-out ${
    //       mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
    //     }`}
    //   >
    //     {menuItems.map((item) => (
    //       <Link key={item.to} className="block py-2 px-4 hover:bg-gray-700" to={item.to} onClick={() => setMobileMenuOpen(false)}>
    //         {item.label}
    //       </Link>
    //     ))}
    //     <Link className="block py-2 px-4 hover:bg-gray-700 flex items-center gap-2" to={token ? '/profile' : '/login'} onClick={() => setMobileMenuOpen(false)}>
    //       <img src="/user.svg" alt="User" />
    //       <p>{token ? user?.userName : 'Login'}</p>
    //     </Link>
    //   </div>
    // </nav>
  );
}

export default Navbar;
