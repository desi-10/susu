import { Button } from "@/components/ui/button";
import React from "react";

const DashboardComponent = () => {
  return (
    <>
      <section className="flex justify-between items-center py-3">
        <h1 className="text-lg lg:text-3xl font-bold">Dashboard</h1>
        <div>
          <Button className="shadow-md">Download</Button>
        </div>
      </section>

      <section className="grid gap-2 md:grid-cols-4 lg:gap-5 mb-10">
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="border rounded shadow-lg h-80">Chart</div>
        <div className="border rounded shadow-lg h-80">Sales</div>
      </section>
    </>
  );
};

export default DashboardComponent;
