/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `card_id` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `has_ended` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Card` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Deposit` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cardId` was added to the `Card` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `customer_id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - The required column `customerId` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `customerName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_id` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "withdrawal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL DEFAULT 0,
    "card_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "withdrawal_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card" ("cardId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "withdrawal_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "withdrawal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "password", "updatedAt", "username") SELECT "createdAt", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_Card" (
    "cardId" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasEnded" BOOLEAN NOT NULL DEFAULT false,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("createdAt", "rate", "updatedAt") SELECT "createdAt", "rate", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Customer" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "gender" TEXT,
    "location" TEXT,
    "nextOfKin" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("createdAt", "updatedAt") SELECT "createdAt", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "card_id" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card" ("cardId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deposit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deposit_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deposit" ("createdAt", "deposit_id", "rate", "updatedAt") SELECT "createdAt", "deposit_id", "rate", "updatedAt" FROM "Deposit";
DROP TABLE "Deposit";
ALTER TABLE "new_Deposit" RENAME TO "Deposit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
