"use client";

import { ModeToggle } from "@/components/examples/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const Userschema = z.object({
  username: z.string().min(2, "Username must at least be 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof Userschema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(Userschema) });

  const onSumbit: SubmitHandler<FormFields> = async (data) => {
    try {
      await fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen flex w-full lg:grid lg:grid-cols-2 justify-center items-center">
      <div className="container hidden py-10 bg-gray-900 text-white lg:flex flex-col h-screen justify-between dark:bg-gray-950">
        <h1 className="">Acme Inc</h1>
        <p className="mt-6 border-l-2 pl-6 italic">
          Acme Inc “This library has saved me countless hours of work and helped
          me deliver stunning designs to my clients faster than ever before.”
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="container mx-auto md:w-[400px]"
      >
        <div className="mb-5">
          <h1 className="scroll-m-20 text-center mb-1 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
            Login to account
          </h1>
          <p className="text-[12px] md:text-sm text-center text-muted-foreground">
            Enter your credentials below to sign in
          </p>
        </div>
        <div className="grid mb-3">
          <Label htmlFor="" className="text-xs font-medium leading-none mb-1">
            Username
          </Label>
          <Input
            {...register("username")}
            type="text"
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="text-red-500 text-[10px] md:text-xs">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="grid mb-5">
          <Label htmlFor="" className="text-xs font-medium leading-none mb-1">
            Password
          </Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="***************"
          />
          {errors.password && (
            <span className="text-red-500 text-[10px] md:text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button className="w-full mb-3" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <p className="text-[10px] md:text-sm text-center text-muted-foreground hover:underline hover:text-black dark:hover:text-white">
          <Link href="">Do you have an account? Create an account</Link>
        </p>
      </form>
      <div className="fixed bottom-5 right-5">
        <ModeToggle />
      </div>
    </main>
  );
}
