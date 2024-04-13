"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "./ui/label";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Flower } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme } = useTheme();
  const path = usePathname();
  const router = useRouter();
  const handleLocalStorage = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <main className="">
      <section className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-10">
          <Label>
            <Link href="/dashboard">
              <div className="flex flex-col items-center justify-center">
                <Flower />
                <p>Mini Bank</p>
              </div>
            </Link>
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-10 w-10 border flex items-center justify-center rounded-full">
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div onClick={handleLocalStorage}>Logout</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
