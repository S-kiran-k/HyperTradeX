import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import { useEffect, useState } from "react";

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
      <p>{stockId}</p>
      <div className="2xl:container mx-auto">
        <div className="w-[90%] mx-auto grid grid-cols-1">
          <p>{stockDetailData.symbol}</p>
          <p>{stockDetailData.aboutStock}</p>
        </div>
      </div>
    </>
  );
};

export default StockDetail;
