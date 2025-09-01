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
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button variant={"default"} className="cursor-pointer">Login</Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
         <span>Or</span>
         <form action="">
          <Button type="submit" variant={"outline"}>
            Login with Google
          </Button>
         </form>
         <Link href="/signup">
           <Button variant={"link"}>Don't have an account? Register</Button>
         </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
