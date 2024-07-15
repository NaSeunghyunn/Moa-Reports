-- CreateTable
CREATE TABLE "CommuterPass" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "startDay" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CommuterPass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommuterPass" ADD CONSTRAINT "CommuterPass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
