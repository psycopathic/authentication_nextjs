import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials)=> {
        if (!credentials) return null;

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) throw new CredentialsSignin("please provide both email and password");

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await User.findOne({ email });

        if (password !== "passcode") {
          throw new Error("Password does not match");
        }

        return user;
      },
    }),
  ],
});


