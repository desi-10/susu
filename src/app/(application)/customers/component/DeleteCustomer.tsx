"use client";

import { Button } from "@/components/ui/button";
import { log } from "console";
import { useRouter } from "next/navigation";

import React from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const DeleteCustomer = ({ customerId }: { customerId: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/customers/${id}`, {
        method: "DELETE",
      });
      router.push("/customers");
      toast("Customer deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={() => handleDelete(customerId)}
    >
      {pending ? "Deleting" : "Delete Customer"}
    </Button>
  );
};

export default DeleteCustomer;
