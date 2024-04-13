"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { SingleCustomerType } from "../[id]/page";
import { TableDemo } from "@/components/examples/TableDemo";
import { currency } from "@/lib/utils";
import DeleteCustomer from "./DeleteCustomer";
import { AlertDialogDemo } from "@/components/examples/AlertDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SingleCustomerComponent = ({ data }: { data: SingleCustomerType }) => {
  const router = useRouter();

  const calculatedRate = () => {
    return data.cards.reduce((acc, curr) => acc + curr.rate, 0);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/customers/${data.customerId}`,
        {
          method: "DELETE",
        }
      );
      const dataApi = await res.json();
      if (!dataApi.success) return;
      toast(`${dataApi.message}`);
      router.push("/customers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Edit Customer Details</h1>
        {/* <DeleteCustomer customerId={data.customerId} /> */}
        <AlertDialogDemo
          title="Delete customer"
          handleFunction={handleDelete}
        />
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
              {/* <p>{data.customerId}</p> */}
            </div>
          </div>
        </section>

        <div className="flex space-x-5 items-center">
          <p className="text-4xl font-bold">{currency(calculatedRate())}</p>
        </div>
      </section>
      <main className="mb-5">
        <TableDemo data={data.cards} />
      </main>
    </>
  );
};

export default SingleCustomerComponent;
