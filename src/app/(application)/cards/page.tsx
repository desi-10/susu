import { z } from "zod";
import CardComponent from "./component/CardComponent";

const cardSchema = z.object({
  cardId: z.string(),
  rate: z.number().positive(),
  startedDate: z.string(),
  hasEnded: z.boolean(),
  totalAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const ArrayCardSchema = z.array(cardSchema);

export type TArrayCardSchema = z.infer<typeof ArrayCardSchema>;
export type cardSchema = z.infer<typeof cardSchema>;

const fetchCards = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/card", {
      cache: "no-store",
    });

    const data = await res.json();
    if (!data.success) throw "Error";
    const validFields = ArrayCardSchema.safeParse(data.data);
    if (!validFields.success) throw validFields.error.flatten();
    return validFields.data;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

const CardsPage = async () => {
  const data = await fetchCards();

  if (!data) return <div>Something went wrong</div>;

  console.log(data);

  return (
    <main>
      <CardComponent data={data} />
    </main>
  );
};

export default CardsPage;
