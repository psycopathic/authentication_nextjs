import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

//connection to db 
// making of custome login and signup pages


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
      authorize: async (credentials) => {
        if (!credentials) return null;

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("please provide both email and password");

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await User.findOne({ email }).select("+password");
        if (!user)
          throw new CredentialsSignin("No user found with the given email");

        if (!user.password)
          throw new CredentialsSignin("No password found for the user");

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new CredentialsSignin("Password does not match");

        if (password !== "passcode") {
          throw new CredentialsSignin("Password does not match");
        }

        return user;
      },
    }),
  ],
});
