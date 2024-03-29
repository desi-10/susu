import CustomerComponent from "./component/CustomerComponent";
import { ArrayCustomerSchema } from "./types/types";

export const dynamic = "force-dynamic";

const fetchCustomers = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/customers`, {
      next: {
        tags: ["customers"],
        revalidate: 0,
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

  return (
    <main>
      <CustomerComponent data={data} />
    </main>
  );
};

export default CustomersPage;
