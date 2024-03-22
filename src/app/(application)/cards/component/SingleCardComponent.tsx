"use client";
import { TableDemo } from "@/components/examples/TableDemo";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import React from "react";
import { Card } from "../[id]/page";
import CardTable from "./CardTable";
import MakeDeposit from "./MakeDeposit";
import { AlertDialogDemo } from "@/components/examples/AlertDialog";
import { toast } from "sonner";

const SingleCardComponent = ({ data }: { data: Card }) => {
  const handleDelete = async () => {
    toast("Thank you!");
  };
  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Card Details</h1>
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
              <AlertDialogDemo
                title="Delete Card Record"
                handleFunction={handleDelete}
              />
              <AlertDialogDemo
                title="Delete Card Record"
                handleFunction={handleDelete}
              />
            </div>
          </div>
        </section>

        <div className="flex space-x-5 items-center">
          {/* <p className="text-4xl font-bold">{currency(calculatedRate())}</p> */}
          <section className="grid gap-2">
            <MakeDeposit data={data} />
            <Button variant="outline">Make Withdrawal</Button>
          </section>
        </div>
      </section>
      <main className="mb-5">
        <CardTable data={data.deposits} />
      </main>
    </>
  );
};

export default SingleCardComponent;
