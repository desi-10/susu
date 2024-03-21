"use client";
import { TableDemo } from "@/components/examples/TableDemo";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import React from "react";
import { Card } from "../[id]/page";

const SingleCardComponent = ({ data }: { data: Card }) => {
  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Card Details</h1>
        <Button variant="destructive">Delete Card</Button>
      </div>

      <section className="flex justify-between items-center mb-8">
        <section className="flex items-center space-x-5">
          <div className="h-20 w-20 rounded-full border"></div>
          <div>
            <div className="flex items-center space-x-3">
              <p>Customer Name</p>
              <p>{data.customer.customerName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <p>Card ID</p>
              <p className="truncate w-36">{data.cardId}</p>
            </div>
            <div className="flex items-center space-x-3">
              <p>Contact</p>
              {/* <p>{data.customerId}</p> */}
            </div>
          </div>
        </section>

        <div className="flex space-x-5 items-center">
          {/* <p className="text-4xl font-bold">{currency(calculatedRate())}</p> */}
          <section className="grid gap-2">
            <Button>Make Deposit</Button>
            <Button variant="outline">Make Withdrawal</Button>
          </section>
        </div>
      </section>
      <main className="mb-5">
        {/* <TableDemo data={data.cards} /> */}
        {/* <TableDemo /> */}
      </main>
    </>
  );
};

export default SingleCardComponent;
