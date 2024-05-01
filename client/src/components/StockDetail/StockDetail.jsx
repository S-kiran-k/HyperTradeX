import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import { useEffect, useState } from "react";
import "./StockDetail.css"
const StockDetail = () => {
  const { stockId } = useParams();
  const [stockDetailData, setstockDetailData] = useState([]);

  const fetchData = async () => {
    try {
      // localhost:3002/stocks
      const data = await axiosInstance.get("/stocks/" + stockId);
      console.log(data.data.data);
      setstockDetailData(data.data.data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(stockDetailData);
  return (
    <>
      <div className="2xl:container mx-auto contain">
        <div className="w-[80%] mx-auto grid grid-cols-1 py-14">
          <div className="rounded-xl bg-white shadow-lg h-[80vh] flex flex-col justify-center">
            <div>
              <p className="text-5xl text-center underline">{stockDetailData.symbol}</p>
              <p></p>
              <p className="flex flex-col text-gray-500 px-3 text-center py-2"> <span className="">ABOUT:</span>{stockDetailData.aboutStock}</p>
              <div className="flex justify-between px-3">
                <p className="text-green-600 py-2">OPENING:{stockDetailData.open}</p>
                <p className="text-red-600 py-2">CLOSING:{stockDetailData.close}</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-1 bg-slate-400 w-[500px] py-1 "></div>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button className="text-white bg-orange-600 rounded-xl shadow-lg px-16 py-3 heartbeat">BUY</button>
                <button className="text-white bg-green-600 rounded-xl shadow-lg px-16 py-3 heartbeat">SELL</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default StockDetail;
