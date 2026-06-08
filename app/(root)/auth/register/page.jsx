"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { Button } from "@/components/ui/button";

// Eye icons.
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Link from "next/link";
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from "@/routes/WebsiteRoute";
import z from "zod";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password and confirm shoud be match",
      path: ["confirmPassword"],
    });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className="w-[400px]  h-[600px] ">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[150px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account !</h1>
          <p>Create New account by filling out the form below</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
            <div className="mt-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="enter your name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seam@gmail.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input  
                          type="password" placeholder="**********" {...field}
                        />
                      </FormControl>
                    
                      <FormMessage />
                    </FormItem>
                  )}
                />

                
              </div>

              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="pass "
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-1/2 right-2 cursor-pointer"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ButtonLoading
                  // loading={loading}
                  type="submit"
                  text="Create Account"
                  className="w-full  "
                />
              </div>

 


              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  <p>Allready  have account</p>
                  <Link
                    href={WEBSITE_LOGIN}
                    className="text-primary underline"
                  >
                    Login 
                  </Link>
                </div>
            
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
