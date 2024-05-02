import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Portfolio from "../components/Portfolio/Portfolio";
import Footer from "../components/Footer/Footer";
import Register from "../components/Register/Register";
import Stock from "../components/Stock/Stock";
import StockDetail from "../components/StockDetail/StockDetail";
import { Toaster } from 'sonner'


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
        <Toaster richColors position="top-right" closeButton />

      </BrowserRouter>
    </div>
  );
}

export default Path;
