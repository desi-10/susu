/*
  Warnings:

  - Made the column `customerId` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `rate` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Made the column `cardId` on table `Deposit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Deposit` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0.00,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_ended" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("card_id", "createdAt", "customerId", "has_ended", "rate", "start_date", "updatedAt", "userId") SELECT "card_id", "createdAt", "customerId", "has_ended", "rate", "start_date", "updatedAt", "userId" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("card_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deposit" ("cardId", "createdAt", "deposit_id", "updatedAt", "userId") SELECT "cardId", "createdAt", "deposit_id", "updatedAt", "userId" FROM "Deposit";
DROP TABLE "Deposit";
ALTER TABLE "new_Deposit" RENAME TO "Deposit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
