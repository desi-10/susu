import React from "react";
import DepositComponent from "./components/DepositComponent";

const fetchDeposits = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/deposits`, {
    cache: "no-store",
  });
  return res.json();
};

const DepositsPage = async () => {
  const data = await fetchDeposits();
  console.log(data);

  return (
    <div>
      <DepositComponent data={data.data} />
    </div>
  );
};

export default DepositsPage;
