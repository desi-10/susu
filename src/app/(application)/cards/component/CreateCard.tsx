"use client";

import { DatePickerDemo } from "@/components/examples/DatePicker";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectScrollable from "@/components/examples/SelectScrollable";
import { useEffect, useState } from "react";
import { User } from "@/types/users/types";
import {
  GetCustomerTypes,
  getCustomerSchemaArray,
} from "@/types/customers/customers";
import { toast } from "sonner";
import { TPostCardSchema, postCardSchema } from "@/types/cards/types";

const CreateCard = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<GetCustomerTypes[] | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TPostCardSchema>({
    resolver: zodResolver(postCardSchema),
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/customers`);
        const data = await res.json();
        if (data.success === false) throw data.error;
        const validFields = getCustomerSchemaArray.safeParse(data.data);
        if (!validFields.success) {
          throw validFields.error;
        }
        setCustomers(validFields.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      setLoggedInUser(JSON.parse(storage) as User);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  const onSubmit: SubmitHandler<TPostCardSchema> = async (data) => {
    try {
      await fetch(`http://localhost:3000/api/card`, {
        method: "POST",
        body: JSON.stringify({ ...data, userId: loggedInUser?.userId }),
      });
      reset();
      toast("Card created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Card</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Card</DialogTitle>
          <DialogDescription>Enter card details below</DialogDescription>
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
            {errors.customerId && (
              <span className="text-xs text-red-500">
                {errors.customerId.message}
              </span>
            )}
          </div>

          <div>
            <Label className="text-sm">Has Ended</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("hasEnded")}
                  value="yes"
                  id="yes"
                />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem {...register("hasEnded")} value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Save Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCard;
