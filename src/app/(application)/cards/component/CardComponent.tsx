import { DataTable } from "@/components/table/data-table";
import React from "react";
import { columns } from "./columns";
import { TArrayCardSchema } from "../page";
import CreateCard from "./CreateCard";

const CardComponent = ({ data }: { data: TArrayCardSchema }) => {
  return (
    <>
      <section className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Cards</h1>
        <CreateCard />
      </section>

      <section className="grid gap-2 md:grid-cols-4 lg:gap-5 mb-10">
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Cards</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Deposits</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Withdrawals</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
      </section>

      <div className="my-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default CardComponent;
