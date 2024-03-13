/*
  Warnings:

  - You are about to drop the column `date` on the `Deposit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "rate" REAL NOT NULL DEFAULT 0.00,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_ended" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deposit" ("createdAt", "customerId", "deposit_id", "updatedAt") SELECT "createdAt", "customerId", "deposit_id", "updatedAt" FROM "Deposit";
DROP TABLE "Deposit";
ALTER TABLE "new_Deposit" RENAME TO "Deposit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
