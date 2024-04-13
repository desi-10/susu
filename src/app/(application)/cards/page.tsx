import { z } from "zod";
import CardComponent from "./component/CardComponent";
import { ArrayCardSchema } from "@/types/cards/types";

const fetchCards = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/card`, {
      cache: "no-store",
    });

    const data = await res.json();
    const validFields = ArrayCardSchema.safeParse(data.data);
    if (!validFields.success) {
      throw validFields.error;
    }
    return validFields.data;
  } catch (error) {
    console.error(error);
  }
};

const CardsPage = async () => {
  const data = await fetchCards();

  if (!data) return <div>Something went wrong</div>;

  return (
    <main>
      <CardComponent data={data} />
    </main>
  );
};

export default CardsPage;
