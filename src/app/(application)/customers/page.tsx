import { getCustomerSchemaArray } from "@/types/customers/customers";
import CustomerComponent from "./component/CustomerComponent";

const fetchCustomers = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/customers`, {
      cache: "no-store",
    });
    const data = await res.json();
    const validFields = getCustomerSchemaArray.safeParse(data.data);
    if (!validFields.success) {
      throw validFields.error.flatten().fieldErrors;
    }
    return validFields.data;
  } catch (error) {
    console.error(error);
  }
};

const CustomersPage = async () => {
  const data = await fetchCustomers();

  if (!data) return <div>Something went wrong</div>;

  return (
    <main>
      <CustomerComponent data={data} />
    </main>
  );
};

export default CustomersPage;
