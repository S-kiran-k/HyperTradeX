/*
  Warnings:

  - You are about to drop the column `user_id` on the `Stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetailedStock" DROP CONSTRAINT "DetailedStock_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_user_id_fkey";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "user_id",
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("stock_id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "StockUser" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "StockUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockUser_id_key" ON "StockUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StockUser_user_id_stock_id_key" ON "StockUser"("user_id", "stock_id");

-- AddForeignKey
ALTER TABLE "StockUser" ADD CONSTRAINT "StockUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockUser" ADD CONSTRAINT "StockUser_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("stock_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailedStock" ADD CONSTRAINT "DetailedStock_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("stock_id") ON DELETE CASCADE ON UPDATE CASCADE;
