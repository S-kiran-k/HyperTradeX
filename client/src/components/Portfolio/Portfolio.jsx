import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios/axios";
import GLOBE from 'vanta/src/vanta.globe';
import { Link } from "react-router-dom";
import UserContext from "../Context/userContext"

import "./Portfolio.css"


function Portfolio() {
  const el = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js effect
    const vantaEffect = GLOBE({
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
  const data = useContext(UserContext);
  console.log("::", data.userData);

  const { user_id } = data.userData;

  const fetchData = async () => {
    try {
      // localhost:3003/stocks
      const data = await axiosInstance.get(`/stocks/user/${user_id}`);
      console.log(data.data.data.stocks);
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
              <p className="text-gray-500">No stocks available.</p>
            </div>
          ) : (
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4">
              {stockData.map((e) => {
                console.log(e);
                return (
                  <Link key={e.user_id} to={`/stocks/${e.user_id}`}>
                    <div className="bg-slate-50 ring-1 shadow-md max-w-[200px] p-5 ring-slate-400">
                      <img src={e.image_url} alt={e.name} className="h-9 w-9" />
                      <p>{e.price}</p>
                      <p>{e.recent_selling_price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Portfolio;