import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { Link } from "react-router-dom";
import "./Stock.css"
import Loader from "../Loader/Loader";

function Stock() {
  const [stockData, setStockData] = useState([]);
  const [loader , setLoader] = useState(true);
  const fetchData = async () => {
    try {
      setLoader(false);
      const data = await axiosInstance.get("/stocks");
      setStockData(data.data.data);
      setLoader(true)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


return !loader ? (<>
<Loader/>
</>) :(
    <section className="py-5">
      <div className="2xl:container mx-auto">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {stockData.map((e) => (
            <Link to={`/stocks/${e.stock_id}`} key={e.stock_id}>
              <div className="card">
                <img src={e.image_url} alt={e.name} />
                <div className="p-4">
                  <p className="text-xl font-medium text-[#23153c]">{e.name}</p>
                  <div className="flex items-start gap-20 mt-2">
                    <p className="text-base">&#8377;{e.price}</p>
                    <p className="text-base text-[#07B79C]">&#8377;{e.recent_selling_price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    );
}

export default Stock;
