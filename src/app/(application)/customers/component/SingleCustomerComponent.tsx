import { Button } from "@/components/ui/button";
import React from "react";
import { SingleCustomerType } from "../[id]/page";
import { TableDemo } from "@/components/examples/TableDemo";
import { currency } from "@/lib/utils";

const SingleCustomerComponent = ({ data }: { data: SingleCustomerType }) => {
  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1>Edit Customer Details</h1>
        <Button variant="destructive">Deactive</Button>
      </div>

      <section className="flex justify-between items-center mb-8">
        <section className="flex items-center space-x-5">
          <div className="h-20 w-20 rounded-full border"></div>
          <div>
            <div className="flex items-center space-x-3">
              <p>Name</p>
              <p>{data.customerName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <p>ID</p>
              <p className="truncate">{data.customerId}</p>
            </div>
            <div className="flex items-center space-x-3">
              <p>Contact</p>
              <p>{data.customerId}</p>
            </div>
          </div>
        </section>

        <div className="flex space-x-5 items-center">
          <p className="text-4xl font-bold">{currency(300)}</p>
          <section className="grid gap-2">
            <Button>Make Deposit</Button>
            <Button variant="outline">Make Withdrawal</Button>
          </section>
        </div>
      </section>
      <main className="mb-5">
        <TableDemo data={data.cards} />
      </main>
    </>
  );
};

export default SingleCustomerComponent;
