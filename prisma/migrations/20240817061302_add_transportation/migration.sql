-- CreateTable
CREATE TABLE "Transportation" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transportation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportationDetail" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "isTwoWayDirection" BOOLEAN NOT NULL,
    "goal" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "transportationId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transportation_year_month_userId_key" ON "Transportation"("year", "month", "userId");

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportationDetail" ADD CONSTRAINT "TransportationDetail_transportationId_fkey" FOREIGN KEY ("transportationId") REFERENCES "Transportation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
