import { z } from "zod";
import CardComponent from "./component/CardComponent";

const cardSchema = z.object({
  cardId: z.string(),
  rate: z.number().positive(),
  startDate: z.string(),
  hasEnded: z.boolean(),
  totalAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  customer: z.object({
    customerId: z.string(),
    customerName: z.string(),
  }),
});

const ArrayCardSchema = z.array(cardSchema);

export type TArrayCardSchema = z.infer<typeof ArrayCardSchema>;
export type cardSchema = z.infer<typeof cardSchema>;

const fetchCards = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/card`, {
      cache: "no-store",
    });

    const data = await res.json();
    if (!data.success) throw "Error";
    // const validFields = ArrayCardSchema.safeParse(data.data);
    // if (!validFields.success) throw validFields.error.flatten();
    // return validFields.data;
    return data.data;
  } catch (error) {
    console.log(error);
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
