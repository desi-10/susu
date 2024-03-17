-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "totalAmount" REAL DEFAULT 0;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "cardId" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasEnded" BOOLEAN NOT NULL DEFAULT false,
    "totalAmount" REAL NOT NULL DEFAULT 0,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("cardId", "createdAt", "customer_id", "hasEnded", "rate", "startDate", "updatedAt", "user_id") SELECT "cardId", "createdAt", "customer_id", "hasEnded", "rate", "startDate", "updatedAt", "user_id" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "card_id" TEXT NOT NULL,
    "rate" REAL NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card" ("cardId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deposit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deposit_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deposit" ("card_id", "createdAt", "customer_id", "deposit_id", "rate", "updatedAt", "user_id") SELECT "card_id", "createdAt", "customer_id", "deposit_id", "rate", "updatedAt", "user_id" FROM "Deposit";
DROP TABLE "Deposit";
ALTER TABLE "new_Deposit" RENAME TO "Deposit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
