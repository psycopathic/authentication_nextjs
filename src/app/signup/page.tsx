import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs";
import User from "@/src/models/userModel";
import Link from "next/link";
import { redirect } from "next/navigation";

const Signup = async () => {
  const handlerSignup = async (formData: FormData) => {
    "use server";
    try {
        const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name || !email || !password) {
      throw new Error("Missing fields");
    }
    const isPresent = await User.findOne({ email });
    if (isPresent) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    redirect("/login");
    } catch (error) {
        console.log(`There is an error while signing up: ${error}`);
        throw new Error("Signup failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Signup</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form action={handlerSignup}>
            <Input placeholder="Name" type="text" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button variant={"default"} className="cursor-pointer">
            Signup
          </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Signup with Google
            </Button>
          </form>
          <Link href="/login">
            <Button variant={"link"}>Already have an account? Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
