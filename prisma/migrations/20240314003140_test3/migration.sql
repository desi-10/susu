/*
  Warnings:

  - You are about to drop the column `customerId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `has_ended` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Deposit` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Card" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0.00,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_ended" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("customer_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("card_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deposit" ("createdAt", "deposit_id", "updatedAt") SELECT "createdAt", "deposit_id", "updatedAt" FROM "Deposit";
DROP TABLE "Deposit";
ALTER TABLE "new_Deposit" RENAME TO "Deposit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
