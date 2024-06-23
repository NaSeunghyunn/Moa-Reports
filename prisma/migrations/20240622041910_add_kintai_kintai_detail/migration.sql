-- CreateTable
CREATE TABLE "Kintai" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yearMonth" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Kintai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KintaiDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "breakTime" INTEGER NOT NULL DEFAULT 1,
    "workType" TEXT NOT NULL,
    "remarks" TEXT,
    "kintaiId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "KintaiDetail_kintaiId_fkey" FOREIGN KEY ("kintaiId") REFERENCES "Kintai" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
