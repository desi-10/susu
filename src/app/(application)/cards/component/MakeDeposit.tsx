import {
  TPostCardSchema,
  postCardSchema,
} from "@/app/api/card/schema/cardSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { User } from "./CreateCard";
import { ArrayCustomerSchema } from "../../customers/types/types";
import { DatePickerDemo } from "@/components/examples/DatePicker";
import SelectScrollable from "@/components/examples/SelectScrollable";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "../[id]/page";
import { z } from "zod";

const makeDepositSchema = z.object({
  rate: z.coerce.number().positive(),
  startDate: z.date(),
});

type makeDepositType = z.infer<typeof makeDepositSchema>;

const MakeDeposit = ({ data }: { data: Card }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<makeDepositType>({
    resolver: zodResolver(makeDepositSchema),
  });

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      setLoggedInUser(JSON.parse(storage) as User);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  const onSubmit: SubmitHandler<makeDepositType> = async (formData) => {
    try {
      await fetch(`http://localhost:3000/api/deposits`, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          cardId: data.cardId,
          customerId: data.customer.customerId,
          userId: loggedInUser?.userId,
        }),
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Make deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make Deposit</DialogTitle>
          <DialogDescription>Enter deposit details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-3">
          <div>
            <Label className="text-sm">Rate</Label>
            <Input
              type="number"
              id="rate"
              {...register("rate")}
              placeholder="Enter rate"
            />
            {errors.rate && (
              <span className="text-xs text-red-500">
                {errors.rate.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="startDate" className="text-sm">
              Start Date
            </Label>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <DatePickerDemo onChange={onChange} selected={value} />
              )}
            />
            {errors.startDate && (
              <span className="text-xs text-red-500">
                {errors.startDate.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Save Deposit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default MakeDeposit;
