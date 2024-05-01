-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stock" (
    "stock_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "recent_selling_price" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DetailedStock" (
    "detail_stock_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "open" INTEGER NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "close" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "lowPriceRange" INTEGER NOT NULL,
    "highPriceRange" INTEGER NOT NULL,
    "totalBuyQty" INTEGER NOT NULL,
    "totalSellQty" INTEGER NOT NULL,
    "aboutStock" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_stock_id_key" ON "Stock"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedStock_detail_stock_id_key" ON "DetailedStock"("detail_stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedStock_stock_id_key" ON "DetailedStock"("stock_id");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailedStock" ADD CONSTRAINT "DetailedStock_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
