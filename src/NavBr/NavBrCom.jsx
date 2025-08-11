import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = token
    ? [
        { to: "/showsales", label: "Sale" },
        { to: "/showPurchase", label: "Purchase" },
        { to: "/ShowProduction", label: "Production" },
        { to: "/ShowParty", label: "Party" },
        { to: "/ShowProduct", label: "Product" },
        { to: "/ShowComponent", label: "Component" },
        { to: "/ShowEmployee", label: "Employee" },
        { to: "/attendance", label: "Attendance" },
        { to: "/Other", label: "Other" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/shop", label: "Products" },
        { to: "/AboutUs", label: "About Us" },
        { to: "/Services", label: "Services" },
      ];

  return (
    <nav className="bg-gray-800 text-white p-4 relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-white text-2xl font-bold" to="/">
          TechnoFarm<span>.</span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              className="hover:text-gray-400"
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Icon */}
        <div className="hidden md:flex md:space-x-4">
          <Link
            className="hover:text-gray-400 flex gap-2"
            to={token ? "/login" : "/login"}
          >
            <img src="/user.svg" alt="User" />
            <p>{token ? user?.userName : "Login"}</p>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={closeMobileMenu}
      >
        <div
          className={`absolute top-0 left-0 w-2/3 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="text-white absolute top-4 right-4 focus:outline-none"
            onClick={closeMobileMenu}
          >
            ✖
          </button>

          {/* Menu Items */}
          <div className="flex flex-col p-6 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                className="block py-2 px-4 hover:bg-gray-700"
                to={item.to}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="block py-2 px-4 hover:bg-gray-700 flex items-center gap-2"
              to={token ? "/login" : "/login"}
              onClick={closeMobileMenu}
            >
              <img src="/user.svg" alt="User" />
              <p>{token ? user?.userName : "Login"}</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
