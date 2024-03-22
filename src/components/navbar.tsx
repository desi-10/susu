"use client";

import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "./ui/label";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  return (
    <main className="">
      <section className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-10">
          <Label className="text-lg">
            <Link href="/dashboard">Susu Management System</Link>
          </Label>

          <div className="hidden lg:flex items-center space-x-5 text-gray-400">
            <Link href="/dashboard">
              <Label
                className={`dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300 ${
                  path === "/dashboard"
                    ? " dark:text-white text-black font-bold"
                    : ""
                }`}
              >
                Overview
              </Label>
            </Link>

            <Link href="/customers">
              <Label
                className={`dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300 ${
                  path === "/customers"
                    ? "dark:text-white text-black font-bold"
                    : ""
                }}`}
              >
                Customers
              </Label>
            </Link>
            <Link href="/cards">
              <Label
                className={`dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300 ${
                  path === "/cards"
                    ? "dark:text-white text-black font-bold"
                    : ""
                }}`}
              >
                Cards
              </Label>
            </Link>
            <Link href="/deposits">
              <Label
                className={`dark:hover:text-white hover:text-black cursor-pointer transition-colors duration-300 ${
                  path === "/deposits"
                    ? "dark:text-white text-black font-bold"
                    : ""
                }}`}
              >
                Deposits
              </Label>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          {/* <form action="">
            <Input type="text" className="" placeholder="Search..." />
          </form> */}
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
