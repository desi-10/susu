-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "cardId" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasEnded" BOOLEAN NOT NULL DEFAULT false,
    "totalAmount" REAL DEFAULT 0,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("cardId", "createdAt", "customer_id", "hasEnded", "rate", "startDate", "totalAmount", "updatedAt", "user_id") SELECT "cardId", "createdAt", "customer_id", "hasEnded", "rate", "startDate", "totalAmount", "updatedAt", "user_id" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Customer" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "gender" TEXT,
    "location" TEXT,
    "nextOfKin" TEXT,
    "totalAmount" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("createdAt", "customerId", "customerName", "gender", "location", "nextOfKin", "totalAmount", "updatedAt") SELECT "createdAt", "customerId", "customerName", "gender", "location", "nextOfKin", coalesce("totalAmount", 0) AS "totalAmount", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
