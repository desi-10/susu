"use client";
import {
  TFormFields,
  formFields,
} from "@/app/api/customers/schema/customerSchema";
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
import { useForm, SubmitHandler } from "react-hook-form";

export function CreateCustomer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<TFormFields>({
    resolver: zodResolver(formFields),
  });

  const onSubmit: SubmitHandler<TFormFields> = (data) => {
    try {
      const res = fetch("http://localhost:3000/api/customers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
          <DialogDescription>Enter customer details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-3">
          <div>
            <Label htmlFor="customerName" className="text-sm">
              Customer Name
            </Label>
            <Input
              id="customerName"
              {...register("customerName")}
              placeholder="Enter customer name"
            />
            {errors.customerName && (
              <span className="text-xs text-red-500">
                {errors.customerName.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="gender" className="text-sm">
              Gender
            </Label>
            <Input
              id="gender"
              {...register("gender")}
              placeholder="Enter gender"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm">
              Location
            </Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="Enter location"
            />
          </div>
          <div className="grid">
            <Label htmlFor="nextOfKin" className="text-sm">
              Next of kin
            </Label>
            <Input
              id="nextOfKin"
              {...register("nextOfKin")}
              placeholder="Enter next of kin"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
