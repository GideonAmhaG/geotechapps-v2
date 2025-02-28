import { Link } from "react-router-dom";
import { logo } from "../assets";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-2 object-contain" />
      </Link>
      <nav className="flex space-x-6">
        <Link
          to="/design"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Design
        </Link>
        <Link
          to="/help"
          className="font-inter font-medium text-[#6469ff] hover:text-[#4a4a4a]"
        >
          Help
        </Link>
        <Link
          to="/signin"
          className="font-inter font-medium text-[#6469ff] hover:text-[#4a4a4a]"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="font-inter font-medium text-[#6469ff] hover:text-[#4a4a4a]"
        >
          Sign Up
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Dark mode button */}
        <button
          className="p-2 rounded-full bg-gray-200"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <FaMoon className="text-blue-500" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
        </button>
      </div>
    </header>
  );
}
