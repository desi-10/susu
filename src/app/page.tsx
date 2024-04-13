"use client";

import { loginUser } from "@/_actions";
import { ModeToggle } from "@/components/examples/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormFields, loginUserSchema } from "@/types/users/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flower } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(loginUserSchema) });

  const router = useRouter();

  const onSumbit: SubmitHandler<FormFields> = async (data) => {
    try {
      const info = await loginUser(data);
      if (!info?.success) {
        return console.log(info?.errors || info?.message);
      }
      localStorage.setItem("user", JSON.stringify(info.findUser));
      router.push("/dashboard");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen flex w-full lg:grid lg:grid-cols-2 justify-center items-center">
      <div className="container hidden py-10 bg-gray-900 text-white lg:flex flex-col h-screen justify-between dark:bg-gray-950">
        <section>
          <div className="flex flex-col items-center justify-center w-fit">
            <Flower />
            <p>Mini Bank</p>
          </div>
        </section>
        <p className="mt-6 border-l-2 pl-6 italic">
          Saving money is the best defense against financial worries
          <p className="text-sm font-medium leading-none">George Clason</p>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="container mx-auto md:w-[500px]"
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
          <Link href="/signup">Do you have an account? Create an account</Link>
        </p>
      </form>
      <div className="fixed bottom-5 right-5">
        <ModeToggle />
      </div>
    </main>
  );
}
