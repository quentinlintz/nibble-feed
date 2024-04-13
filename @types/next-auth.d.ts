import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends Default {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      credits: number;
    };
  }
}
