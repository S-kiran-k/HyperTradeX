import { insta, linkdin, facebook, arrow , logo} from "../../assets/icons/Icons";
import { Link } from "react-router-dom";
import { BadgePercent, BriefcaseBusiness, Phone, UserRound } from "lucide-react";


function Footer() {
  return (
    <section className="bg-[#22153B] w-full py-10">
      <div className="2xl:container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Company Info and Social Icons */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left px-20">
            <h1 className="text-white text-3xl font-bold">HYPERTRADEX</h1>
            <p className="text-gray-400 text-sm mt-2">
              Transforming Trades into Triumphs
            </p>
            <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
              <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition duration-300">
                {insta}
              </button>
              <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition duration-300">
                {linkdin}
              </button>
              <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition duration-300">
                {facebook}
              </button>
            </div>
          </div>
          <div className="bg-violet-500">
            {/* <img src={logo} alt="image"/>  */}
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center justify-center md:items-start gap-4 px-3">
            <Link
              to="/Portfolio"
              className="text-white text-xl flex items-center gap-2 hover:text-gray-400 transition duration-300"
            >
              <BriefcaseBusiness /> Portfolio
            </Link>
            <Link
              to="/stocks"
              className="text-white text-xl flex items-center gap-2 hover:text-gray-400 transition duration-300"
            >
              <BadgePercent /> Stock Prices
            </Link>
            <Link
              to="/about"
              className="text-white text-xl flex items-center gap-2 hover:text-gray-400 transition duration-300"
            >
              <UserRound /> About Us
            </Link>
            <Link
              to="/contact"
              className="text-white text-xl flex items-center gap-2 hover:text-gray-400 transition duration-300"
            >
              <Phone /> Contact Us
            </Link>
          </div>
        </div>
        {/* Footer Bottom Text */}
        <p className="text-white text-center mt-8">
          &#169; 2024 HYPERTRADEX. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
