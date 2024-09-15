import { useNavigate } from "react-router-dom";
import {  logo  } from "../../assets/icons/Icons"; // Add hamburger icon
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

function Header() {
  const [click, setClick] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const Login = () => {
    navigate("/login");
  };

  const Register = () => {
    navigate("/register");
  };

  const portfolio = () => {
    navigate("/portfolio");
  };

  const stock = () => {
    navigate("/stocks");
  };

  // Toggle function for mobile menu
  const toggleMenu = () => {
    setClick(!click);
  };

  return (
    <div className="2xl:container mx-auto">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 h-[100%] p-2">
        {/* Logo Section */}
        <div className="flex justify-between items-center px-2 md:col-span-1">
          <button className="flex items-center" onClick={goToHome}>
            <img className="h-[20px]" src={logo} alt="Logo" />
            <p className="text-[#23153C] ml-2">HYPERTRADEX</p>
          </button>
          {/* Hamburger / Close Menu Icon (visible on mobile) */}
          <button
            className="md:hidden text-[#23153C] focus:outline-none"
            onClick={toggleMenu}
          >
            {click ? <X /> : <Menu />}{" "}
            {/* Toggle between Menu and Close icons */}
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex justify-center items-center gap-2 col-span-1 px-16">
          <input
            className="w-full  px-1 py-1 rounded-md text-left border-2 shadow-gray-300"
            type="text"
            placeholder="Enter the stock, company name"
          />
          <button className="space-x-2" type="submit">
            <Search />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row justify-center items-center gap-3 col-span-1">
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a]"
            onClick={goToHome}
          >
            Go to Home
          </button>
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a]"
            onClick={portfolio}
          >
            Portfolio
          </button>
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a]"
            onClick={stock}
          >
            Stock List
          </button>
          <button
            className="transition duration-300 ease-in-out bg-[#23153C] hover:bg-blue-600 text-white rounded-lg px-3 py-2"
            onClick={Login}
          >
            Login
          </button>
          <button
            className="transition duration-300 ease-in-out bg-[#23153C] hover:bg-blue-600 text-white rounded-lg px-3 py-2"
            onClick={Register}
          >
            Register
          </button>
        </div>
      </div>

      {/* Mobile Men~u */}
      {click && (
        <div className="md:hidden bg-[#23153C] text-white py-4">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <button onClick={goToHome}>Go to Home</button>
            </li>
            <li>
              <button onClick={portfolio}>Portfolio</button>
            </li>
            <li>
              <button onClick={stock}>Stock List</button>
            </li>
            <li>
              <button onClick={Login}>Login</button>
            </li>
            <li>
              <button onClick={Register}>Register</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
