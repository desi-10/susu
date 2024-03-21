"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";
import { useFormStatus } from "react-dom";

const DeleteCustomer = ({ customerId }: { customerId: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/customers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) return;
      console.log(data);
      router.push("/customers");
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
