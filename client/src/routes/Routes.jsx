import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Login from "../components/Register/Register";
import Portfolio from "../components/Portfolio/Portfolio";
import Footer from "../components/Footer/Footer";
import Register from "../components/Login/Login";
import Stock from "../components/Stock/Stock";
import StockDetail from "../components/StockDetail/StockDetail";


function Path() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stocks" element={<Stock />} />
          <Route path="/stocks/:stockId" element={<StockDetail />} />
          <Route path="/Portfolio" element={<Portfolio />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Path;
