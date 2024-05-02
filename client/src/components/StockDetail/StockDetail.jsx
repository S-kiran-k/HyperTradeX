import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/userContext";

const StockDetail = () => {
  const data = useContext(UserContext);
  const { user_id } = data.userData;
  console.log(data)
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

  const currency = "INR";
  const paymentHandler = async (amount) => {
    // STEP 1 :
    const response = await fetch(`http://localhost:3003/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_n8QTTMDuVYOUrb", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:3003/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonRes = await validateRes.json();

        if (jsonRes.msg === "success") {
          buyStock(stockDetailData.stock_id, user_id);
          console.log(jsonRes.msg);
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "HyperTradeX", //your customer's name
        email: "HyperTradex@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  const buyStock = async (stock_id, user_id) => {
    try {
      console.log(stock_id);

      const formData = {
        user_id: user_id,
        stock_id: stock_id,
      };

      const res = await axiosInstance.post("/buy", formData);

      console.log(res);
    } catch (error) {
      console.log(stock_id);
    }
  };

  const sellStock = async (stock_id, user_id) => {
    try {
      console.log(stock_id);

      const formData = {
        user_id: user_id,
        stock_id: stock_id,
      };

      const res = await axiosInstance.post("/sell", formData);

      console.log(res);
    } catch (error) {
      console.log(stock_id);
    }
  };
  return stockDetailData.length === 0 ? (
    <>
      <p>Loading</p>
    </>
  ) :(
    <>
      <div className="2xl:container mx-auto contain">
        <div className="w-[80%] mx-auto grid grid-cols-1 py-14">
          <div className="rounded-xl bg-white shadow-lg h-[80vh] flex flex-col justify-center">
            <div>
              <p className="text-5xl text-center underline">{stockDetailData.symbol}</p>
              <p className="flex flex-col text-gray-500 px-3 text-center py-2"> <span className="">ABOUT:</span>{stockDetailData.aboutStock}</p>
              <div className="flex justify-between px-3">
                <p className="text-green-600 py-2">OPENING:{stockDetailData.open}</p>
                <p className="text-red-600 py-2">CLOSING:{stockDetailData.close}</p>
              </div>
              <div className="flex justify-center items-center ">
                <div className="h-1 bg-slate-400 w-[500px] py-1 "></div>
                <p>Arrow</p>
                <p>Arrow 2</p>
              </div>
              <div className="flex justify-center items-center gap-5 pt-6">
                <button onClick={() => paymentHandler(stockDetailData.high)} className="text-white bg-orange-600 rounded-xl shadow-lg px-16 py-3 heartbeat">BUY</button>
                <button onClick={() => sellStock(stockDetailData.stock_id, user_id)} className="text-white bg-green-600 rounded-xl shadow-lg px-16 py-3 heartbeat">SELL</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
    );

};

export default StockDetail;
