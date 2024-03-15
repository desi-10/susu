import CustomerComponent from "./CustomerComponent";

const fetchCustomers = async () => {
  const res = await fetch("http://localhost:3000/api/customers", {
    cache: "no-store",
  });
  return res.json();
};

const CustomersPage = async () => {
  const data = await fetchCustomers();

  return (
    <main>
      <CustomerComponent data={data.data} />
    </main>
  );
};

export default CustomersPage;
