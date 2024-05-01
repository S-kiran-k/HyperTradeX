import { insta, linkdin, facebook, arrow } from "../../assets/icons/Icons";
function Footer() {
  return (
    <section className="bg-[#22153B] w-[100%]">
      <div className="2xl:container mx-auto">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2  h-[40vh] ">
          <div className="flex flex-col justify-center items-start gap-5">
            <button className="flex flex-col items-center">
              <p className="text-white text-3xl font-bold mr-2">HYPERTRADEX</p>
              <p className="text-gray-400 text-sm">
                Transforming Trades into Triumphs
              </p>
            </button>
            <div className="flex justify-center items-center gap-2 py-2">
              <button className="text-white hover:text-gray-400 transition duration-300 bg-white rounded-full px-3 py-3 ">
                {insta}
              </button>
              <button className="text-white hover:text-gray-400 transition duration-300 bg-white rounded-full px-3 py-3">
                {linkdin}
              </button>
              <button className="text-white hover:text-gray-400 transition duration-300 bg-white rounded-full px-3 py-3">
                {facebook}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-start justify-center gap-5">
              <button className="text-white flex gap-2 text-2xl">
                {arrow}Portfolio
              </button>
              <button className="text-white flex gap-2 text-2xl">
                {arrow}Stock Prices
              </button>
              <button className="text-white flex gap-2 text-2xl">
                {arrow}Login
              </button>
            </div>
          </div>
        </div>
        <p className="text-white text-center">
          &#169; CopyRights. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
