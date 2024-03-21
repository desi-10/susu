import React from "react";
import SingleCardComponent from "../component/SingleCardComponent";

const fetchCard = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/card/${id}`, {
      cache: "no-store",
      next: {
        revalidate: 2,
      },
    });
    const data = await res.json();
    if (data.success === false) throw data.error;
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const SingleCardPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchCard(params.id);

  if (!data) return <div>Something went wrong</div>;

  console.log(data);

  return (
    <div>
      <SingleCardComponent />
    </div>
  );
};

export default SingleCardPage;
