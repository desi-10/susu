"use client";

import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  return (
    <main className="container p-3 border-b">
      <section className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-10">
          <Label>Desmond Kudjuh</Label>

          <div className="flex items-center space-x-5 text-gray-400">
            <Label className="dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300">
              Overview
            </Label>
            <Label className="dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300">
              Customer
            </Label>
            <Label className="dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300">
              Cards
            </Label>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <Input
            type="text"
            name=""
            id=""
            className=""
            placeholder="Search..."
          />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
