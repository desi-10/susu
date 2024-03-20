import { columns } from "@/app/(application)/customers/columns";
import { DataTable } from "@/components/table/data-table";
import { ArrayCustomerSchema } from "../types/types";
import { CreateCustomer } from "@/app/(application)/customers/component/createCustomer";

const CustomerComponent = ({ data }: { data: ArrayCustomerSchema }) => {
  return (
    <>
      <section className="flex justify-between items-center py-5">
        <h1 className="text-lg lg:text-3xl font-bold">Customers</h1>{" "}
        <CreateCustomer />
      </section>

      <section className="grid gap-2 md:grid-cols-4 lg:gap-5 mb-10">
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Customers</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Customer Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total Deposit</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-3 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <p>Total withdrawals</p>
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

export default CustomerComponent;
