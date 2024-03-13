-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL PRIMARY KEY,
    "customer_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Deposit" (
    "deposit_id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deposit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
