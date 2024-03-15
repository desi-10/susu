import CustomerComponent from "./CustomerComponent";

const fetchCustomers = async () => {
  const res = await fetch("http://localhost:3000/api/customers");
  return res.json();
};

const CustomersPage = async () => {
  const data = await fetchCustomers();
  console.log(data);

  return (
    <main>
      <CustomerComponent data={data} />
    </main>
  );
};

export default CustomersPage;
