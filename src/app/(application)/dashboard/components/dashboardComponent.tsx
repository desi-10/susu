"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardComponent = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
            <p>Total Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total customers</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Deposits</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total withdrawals</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="border rounded shadow-lg h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={100} height={40} data={data}>
              <Bar dataKey="uv" fill="#888888" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border rounded shadow-lg h-80">Sales</div>
      </section>
    </>
  );
};

export default DashboardComponent;
