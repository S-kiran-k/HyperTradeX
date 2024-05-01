import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { Link } from "react-router-dom";
import "./Stock.css"

function Stock() {


  const [stockData, setStockData] = useState([]);

  const fetchData = async () => {
    try {
      // localhost:3003/stocks
      const data = await axiosInstance.get("/stocks");
      console.log(data.data.data);
      setStockData(data.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="py-5" >

        <div className="2xl:container mx-auto ">
          <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 h-[100vh]">
            {stockData.map((e) => {
              return (
                <Link to={`/stocks/${e.stock_id}`} key={e.stock_id}>
                  <div className="shadow-2xl drop-shadow-md max-w-[200px] max-h-[500px] rounded-lg overflow-hidden bg-white hover:slide-fwd-center">
                    <img src={e.image_url} alt={e.name} className="w-full" />
                    <div className="p-4">
                      <p className="text-xl font-medium text-[#23153c]">{e.name}</p>
                      <div className="flex items-start gap-4 mt-2">
                        <p className="text-base">&#8377;{e.price}</p>
                        <p className="text-base text-[#07B79C]">&#8377;{e.recent_selling_price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}

export default Stock;
