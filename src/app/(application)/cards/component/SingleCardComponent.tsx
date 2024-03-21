"use client";
import { TableDemo } from "@/components/examples/TableDemo";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import React from "react";

const SingleCardComponent = () => {
  //  const calculatedRate = () => {
  //     return data.cards.reduce((acc, curr) => acc + curr.rate, 0);
  //   };
  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Edit Customer Details</h1>
        <Button variant="destructive">Delete Customer</Button>
      </div>

      <section className="flex justify-between items-center mb-8">
        <section className="flex items-center space-x-5">
          <div className="h-20 w-20 rounded-full border"></div>
          <div>
            <div className="flex items-center space-x-3">
              <p>Name</p>
              {/* <p>{data.customerName}</p> */}
            </div>
            <div className="flex items-center space-x-3">
              <p>ID</p>
              {/* <p className="truncate">{data.customerId}</p> */}
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
