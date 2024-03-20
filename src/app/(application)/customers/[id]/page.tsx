import React from "react";

const fetchCustomer = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/customers/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const SingleCustomerPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchCustomer(params.id);
  console.log(data);

  return <div>{params.id}</div>;
};

export default SingleCustomerPage;
