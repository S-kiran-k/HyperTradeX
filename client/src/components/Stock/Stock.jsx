import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { Link } from "react-router-dom";

function Stock() {
  const [stockData, setStockData] = useState([]);

  const fetchData = async () => {
    try {
      // localhost:3002/stocks
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
      <section className="py-5">
        <div className="2xl:container mx-auto">
          <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4">
            {stockData.map((e) => {
              return (
                <>
                  <Link to={`/stocks/${e.stock_id}`}>
                    <div className="bg-slate-50 ring-1 shadow-md max-w-[200px] p-5 ring-slate-400">
                      <p>{e.name}</p>
                      <img src={e.image_url} alt={e.name} className="h-9 w-9" />
                      <p>{e.price}</p>
                      <p>{e.recent_selling_price}</p>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>{" "}
      </section>
    </>
  );
}

export default Stock;
