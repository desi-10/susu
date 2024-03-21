"use client";
import {
  TPostCardSchema,
  postCardSchema,
} from "@/app/api/card/schema/cardSchema";
import { DatePickerDemo } from "@/components/examples/DatePicker";
import SelectScrollable from "@/components/examples/SelectScrollable";
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
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { custom, z } from "zod";
import { ArrayCustomerSchema } from "../../customers/types/types";

const depositSchema = z.object({
  rate: z.coerce.number().positive(),
  customerId: z.string(),
  cardId: z.string(),
});

type TDepositSchema = z.infer<typeof depositSchema>;

type User = {
  userId: string;
  username: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
};

// type TCustomers = {
//   customerId: string;
//   customerName: string;
// };

const CreateDeposit = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<ArrayCustomerSchema | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isLoading, errors },
  } = useForm<TDepositSchema>({
    resolver: zodResolver(depositSchema),
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(`${process.env.BASE_URL}/api/customers`);
      const data = await res.json();

      if (!data.success) throw "Error";
      setCustomers(data.data);
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      setLoggedInUser(JSON.parse(storage) as User);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  const onSubmit: SubmitHandler<TDepositSchema> = async (data) => {
    try {
      await fetch("http://localhost:3000/api/deposits", {
        method: "POST",
        body: JSON.stringify({ ...data, userId: loggedInUser?.userId }),
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCustomers = customers?.find(
    (customer) => customer.customerId === watch("customerId")
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Deposit</DialogTitle>
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
            <Label className="text-sm">Customer</Label>
            <Controller
              control={control}
              name="customerId"
              render={({ field: { onChange, value } }) => (
                <SelectScrollable
                  customers={customers}
                  onChange={onChange}
                  selected={value}
                />
              )}
            />
          </div>

          <div>
            <Label className="text-sm">Cards</Label>
            <Controller
              control={control}
              name="cardId"
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={onChange}
                  value={value}
                  disabled={!watch("customerId")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCustomers?.cards.length !== 0 ? (
                      filteredCustomers?.cards.map((card) => (
                        <SelectItem key={card.cardId} value={card.cardId}>
                          {card.rate}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="No card available">
                        No card available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.cardId && (
            <span className="text-xs text-red-500">
              {errors.cardId.message}
            </span>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save Deposit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeposit;
