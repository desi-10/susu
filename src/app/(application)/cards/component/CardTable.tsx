import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Card } from "../[id]/page";

const depositsSchema = z.object({
  deposit_id: z.string(),
  rate: z.number(),
  customer: z.object({
    customerId: z.string(),
    customerName: z.string(),
  }),
  updatedAt: z.string(),
  createdAt: z.string(),
});

type DepositType = z.infer<typeof depositsSchema>;

const CardTable = ({ data }: { data: DepositType[] }) => {
  const calculatedRate = () => {
    return data.reduce((acc, curr) => acc + curr.rate, 0);
  };
  return (
    <Table>
      <TableCaption>A list of your recent deposits.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Deposit ID</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead className="">Updated Date</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="w-full text-center p-10">
              No data
            </TableCell>
          </TableRow>
        ) : (
          data?.map((item) => (
            <TableRow key={item.deposit_id}>
              <TableCell className="font-medium truncate">
                {item.deposit_id}
              </TableCell>
              <TableCell>{currency(item.rate)}</TableCell>
              <TableCell className="">{item.customer.customerName}</TableCell>
              <TableCell className="">{item.updatedAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(item.deposit_id)
                      }
                    >
                      Copy deposit Id
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {/* <Link href={`/cards/${item.deposit_id}`}>
                        View deposit
                      </Link> */}
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      {data?.length !== 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {currency(calculatedRate())}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default CardTable;
