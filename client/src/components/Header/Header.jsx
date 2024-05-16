import { useNavigate } from "react-router-dom";
import { search } from "../../assets/icons/Icons";
function Header() {
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
  return (
    <div className="2xl:container mx-auto">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 h-[100%] p-2">
        <div className="flex justify-start items-center px-2">
          <button className="flex" onClick={goToHome}>
            <img
              className="h-[20px]"
              src="https://ik.imagekit.io/0oeuxr64bc/Stocks%20Website/The%20Fox%20Is%20Black.jpeg?updatedAt=1714639438873"></img>
            <p className="text-[#23153C]">HYPERTRADEX</p>
          </button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <input
            className="px-10 py-1 rounded-md text-left border-2 shadow-gray-300"
            type="text"
            placeholder="Enter the stock, company name"></input>
          <button className="space-x-2" type="submit">
            {search}
          </button>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a] "
            onClick={goToHome}>
            Go to Home
          </button>
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a]"
            onClick={portfolio}>
            Portfolio
          </button>
          <button
            className="transition duration-300 ease-in-out text-[#2e1c4a]"
            onClick={stock}>
            Stock List
          </button>
          <button
            className="transition duration-300 ease-in-out bg-[#23153C] hover:bg-blue-600 text-white rounded-lg px-3 py-2"
            onClick={Login}>
            Login
          </button>
          <button
            className="transition duration-300 ease-in-out bg-[#23153C] hover:bg-blue-600 text-white rounded-lg px-3 py-2"
            onClick={ Register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
