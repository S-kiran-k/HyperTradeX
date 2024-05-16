import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios/axios";
import RINGS from 'vanta/src/vanta.globe';
import UserContext from "../Context/userContext"

import "./Portfolio.css"


function Portfolio() {
  const el = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js effect
    const vantaEffect = RINGS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: window.innerHeight,
      minWidth: window.innerWidth,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xcf1f77,
      maxDistance: 30.0,
      spacing: 17.0,
      fullscreen: true,
    });
    return () => {
      // Clean up Vanta.js effect
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);






  const [stockData, setStockData] = useState([]);
  const [userValue,setUserValue] = useState([])
  const data = useContext(UserContext);
  console.log("::", data.userData);

  const { user_id } = data.userData;

  const fetchData = async () => {
    try {
      // localhost:3003/stocks
      const data = await axiosInstance.get(`/stocks/user/${user_id}`);
      console.log(data.data.data)
      setUserValue(data.data.data)
      setStockData(data.data.data.stocks);

      console.log("data::???", data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="py-5 h-screen" id="vanta">
        <div className="2xl:container mx-auto h-[100%]">
          {stockData.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-300">No stocks available.</p>
            </div>
          ) : (
            <div className="w-[60%] mx-auto grid grid-cols-1 py-10">
                <div className=" bg-white h-[70vh] max-w-96 ">
                  <img alt="img" />
                  {/* <img src={e.image_url} alt={userValue.name} className="h-9 w-9" /> */}
                  

                  <p className="text-xl"><span className="text-xl">UserName:</span>{userValue.username}</p>
                  {/* <p>{e.recent_selling_price}</p> */}
                  <p>Total Stocks You Have Brought ✨ {stockData.length}</p>
                  <div className="flex justify-center items-center pt-20">
                    <img className="h-44" src="https://ik.imagekit.io/0oeuxr64bc/undraw_bear_market_ania.svg?updatedAt=1714648438391"></img>

                  </div>
                </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Portfolio;