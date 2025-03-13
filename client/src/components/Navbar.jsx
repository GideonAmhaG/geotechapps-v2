import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-white border-b border-b-[#e6ebf4]`} // Increased py to make the navbar bigger
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />{" "}
          <p className="text-gray-900 text-[30px] font-bold cursor-pointer flex">
            {" "}
            GeotechApps
          </p>
        </NavLink>

        <div className="flex items-center space-x-6">
          {/* Dark Mode Button */}
          <button
            className="p-1.5 rounded-full bg-gray-200"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <FaMoon className="text-blue-500" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          {/* Desktop Nav Links */}
          <ul className="list-none hidden sm:flex flex-row gap-6">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="text-[14px] font-medium cursor-pointer" // Reduced font size of navlinks
              >
                <NavLink
                  to={`/${link.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }
                  onClick={() => setToggle(false)} // Close the mobile menu on click
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden flex justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[24px] h-[24px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
              style={{
                filter: toggle
                  ? "invert(31%) sepia(96%) saturate(436%) hue-rotate(167deg) brightness(97%) contrast(91%)"
                  : "invert(50%)",
              }}
            />

            {/* Mobile Menu */}
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-5 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-20 rounded-xl border-2 border-gray-300 shadow-lg`}
            >
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className="text-[14px] font-medium cursor-pointer"
                  >
                    <NavLink
                      to={`/${link.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }
                      onClick={() => {
                        setToggle(false); // Close the mobile menu on click
                      }}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
