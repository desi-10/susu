"use client";

import { createUsers } from "@/_actions";
import { ModeToggle } from "@/components/examples/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Userschema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof Userschema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(Userschema) });

  const onSumbit: SubmitHandler<FormFields> = async (data) => {
    const info = await createUsers(data);

    if (!info?.success) {
      return console.log(info?.message || info?.errors);
    }

    console.log(info);
    reset();
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
            Create an account
          </h1>
          <p className="text-[12px] md:text-sm text-center text-muted-foreground">
            Enter your credentials below to sign up
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
          <Link href="/">Login to account</Link>
        </p>
      </form>
      <p>{errors.root?.message}</p>
      <div className="fixed bottom-5 right-5">
        <ModeToggle />
      </div>
    </main>
  );
}
