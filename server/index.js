const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("working V1");
});

// List Stocks
app.get("/stocks", async (req, res) => {
  // Db Logic

  const stockData = await prisma.stock.findMany();

  res.json({ data: stockData });
});

app.post("/stocks", async (req, res) => {
  // GET DATA Frontend
  const { name, image_url, price, recent_selling_price } = req.body;
  console.log(name, image_url, price, recent_selling_price);

  // DB Logic
  const stock = await prisma.stock.create({
    data: {
      name: name,
      image_url: image_url,
      price: price,
      recent_selling_price: recent_selling_price,
    },
  });

  // Res to Frontend
  res.json({ data: stock });
});

// Stock Buying/Selling
app.get("/stocks/:stockId", async (req, res) => {
  // Frontend
  const { stockId } = req.params;

  // Db Logic
  const stockDetailsData = await prisma.detailedStock.findUnique({
    where: {
      stock_id: stockId,
    },
  });

  res.json({ data: stockDetailsData });
});

app.post("/stocksDetails", async (req, res) => {
  // Extracting data from the request body
  const {
    stock_id,
    type,
    symbol,
    open,
    high,
    low,
    close,
    volume,
    lowPriceRange,
    highPriceRange,
    totalBuyQty,
    totalSellQty,
    aboutStock,
  } = req.body;

  try {
    // Assuming 'prisma' is properly instantiated
    const stock = await prisma.detailedStock.create({
      data: {
        stock_id: stock_id,
        type: type,
        symbol: symbol,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: volume,
        lowPriceRange: lowPriceRange,
        highPriceRange: highPriceRange,
        totalBuyQty: totalBuyQty,
        totalSellQty: totalSellQty,
        aboutStock: aboutStock,
      },
    });

    // Sending response to the frontend
    res.json({ data: stock });
  } catch (error) {
    // Handling errors
    console.error("Error creating stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Getting All the User of Stock
app.get("/stocks/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  // Db Logic - Service : Db Logic
  const stockData = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
    include: {
      stock: true,
    },
  });

  const { password, ...stock } = stockData;

  res.json({ data: stock });
});

// Auth - Login
app.post("/login", async (req, res) => {
  // Frontend Data
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    const vaild = await bcrypt.compare(password, user.password);

    // for Normal Login
    if (vaild) {
      const { password, ...data } = user;
      return res.status(200).json({
        success: true,
        data: data,
        message: "Logined in Scuessfully",
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/register", async (req, res) => {
  // Frontend Data
  const { email, password, age, username } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser = await prisma.user.create({
        data: {
          username,
          email,
          age,
          password: hashedPassword,
        },
        select: {
          user_id: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "User Registered",
        data: { user_id: newUser?.user_id },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(3003);
