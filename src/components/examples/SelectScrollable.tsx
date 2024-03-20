"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrayCustomerSchema } from "@/app/(application)/customers/types/types";

type TSelectScroll = {
  onChange: (value: string) => void;
  selected: string;
  customers: ArrayCustomerSchema | null;
};

const SelectScrollable = ({ customers, onChange, selected }: TSelectScroll) => {
  return (
    <Select onValueChange={onChange} value={selected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent>
        {customers?.map((customer) => (
          <SelectItem key={customer.customerId} value={customer.customerId}>
            {customer.customerName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectScrollable;
