/*
  Warnings:

  - A unique constraint covering the columns `[yearMonth,userId]` on the table `Kintai` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kintai_yearMonth_userId_key" ON "Kintai"("yearMonth", "userId");
