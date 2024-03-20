import CustomerComponent from "./component/CustomerComponent";
import { ArrayCustomerSchema } from "./types/types";

const fetchCustomers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/customers", {
      cache: "no-store",
      next: {
        revalidate: 2,
      },
    });

    const data = await res.json();
    if (!data.success) throw data?.error;
    const validFields = ArrayCustomerSchema.safeParse(data?.data);
    if (!validFields.success) {
      throw validFields.error.flatten();
    }
    return validFields.data;
  } catch (error) {
    console.error(error);
  }
};

const CustomersPage = async () => {
  const data = await fetchCustomers();

  if (!data) return <div>Something went wrong</div>;

  console.log(data);

  return (
    <main>
      <CustomerComponent data={data} />
    </main>
  );
};

export default CustomersPage;
