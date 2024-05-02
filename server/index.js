const express = require("express");
const app = express();
const cors = require("cors")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.get("/test", (req, res) => {
  res.json("working V1");
});

// List Stocks
app.get("/stocks", async (req, res) => {
  try {
    // Db Logic
    const stockData = await prisma.stock.findMany();
    res.json({ data: stockData });
  } catch (error) {
    // Handle errors
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/stocks", async (req, res) => {
  try {
    // Get data from the request body
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

    // Response to Frontend
    res.status(201).json({ data: stock }); // 201 status for successful creation
  } catch (error) {
    // Handle errors
    console.error("Error creating stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Stock Buying/Selling
app.get("/stocks/:stockId", async (req, res) => {
  try {
    // Extract stockId from request parameters
    const { stockId } = req.params;

    // DB Logic
    const stockDetailsData = await prisma.detailedStock.findUnique({
      where: {
        stock_id: stockId,
      },
    });

    if (!stockDetailsData) {
      // If stockDetailsData is null (stock not found), send 404 Not Found response
      return res.status(404).json({ error: "Stock not found" });
    }

    // Respond with stock details data
    res.json({ data: stockDetailsData });
  } catch (error) {
    // Handle errors
    console.error("Error fetching stock details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/stocksDetails", async (req, res) => {
  try {
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

    // Creating a new detailed stock entry in the database
    const stock = await prisma.detailedStock.create({
      data: {
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
      },
    });

    // Sending successful response to the frontend
    res.status(201).json({ data: stock });
  } catch (error) {
    // Handle errors
    console.error("Error creating detailed stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/buy", async (req, res) => {
  try {
    const { user_id, stock_id } = req.body;

    // Create a new entry in the StockUser table mapping the user to the stock
    const mappedData = await prisma.stockUser.create({
      data: {
        user_id: user_id,
        stock_id: stock_id,
      },
    });

    // Log the mapped data
    console.log(mappedData);

    // Respond with the mapped data
    res.json({ data: mappedData });
  } catch (error) {
    // Handle errors
    console.error("Error buying stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/sell", async (req, res) => {
  try {
    const { user_id, stock_id } = req.body;

    // Retrieve user data including associated stocks
    const userData = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        stocks: true,
      },
    });

    // If user data is not found, return a 404 Not Found response
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter the user's stocks to find the one to be sold
    const matchingStock = userData.stocks.find(
      (stock) => stock.stock_id === stock_id
    );

    // If no matching stock is found, return a 404 Not Found response
    if (!matchingStock) {
      return res.status(404).json({ error: "Stock not found for the user" });
    }

    // Delete the matching stock entry
    await prisma.StockUser.delete({
      where: {
        id: matchingStock.id,
      },
    });

    // Respond with success
    res.json({ success: true });
  } catch (error) {
    // Handle errors
    console.error("Error selling stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Getting All the User of Stock
app.get("/stocks/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // Retrieve user data including associated stocks
    const userData = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        stocks: true,
      },
    });

    // If user data is not found, return a 404 Not Found response
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user's stock data
    res.json({ data: userData });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Auth - Login
app.post("/login", async (req, res) => {
  try {
    // Frontend Data
    const { email, password } = req.body;
    console.log(email, password);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If user is not found, return 401 Unauthorized response
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    // Compare password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);

    // If passwords match, log in successful
    if (validPassword) {
      // Remove password from user data before sending response
      const { password, ...userData } = user;
      return res.status(200).json({
        success: true,
        data: userData,
        message: "Logged in successfully",
      });
    } else {
      // If passwords do not match, return 401 Unauthorized response
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    // Frontend Data
    const { email, password, age, username } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    // If user with the email already exists, return a 409 Conflict response
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = await prisma.user.create({
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

    // Respond with success and user ID
    return res.status(200).json({
      success: true,
      message: "User Registered",
      data: { user_id: newUser.user_id },
    });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Payements
app.post("/order", async (req, res) => {
  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body; // Options might include amount, currency, etc.
    console.log(options);

    // Create an order using Razorpay API
    const order = await razorpay.orders.create(options);

    // Check if the order creation was successful
    if (!order) {
      // If order creation failed, return a 500 Internal Server Error response
      return res.status(500).send("Error creating order");
    } else {
      // If order creation succeeded, send the order details in the response to frontend
      res.json(order);
    }
  } catch (error) {
    // Handle errors
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  // order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.listen(3003);