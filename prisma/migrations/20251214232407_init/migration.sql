-- CreateTable
CREATE TABLE "ClockLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "lat" REAL,
    "lng" REAL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
