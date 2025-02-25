import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            userId: number;
            username: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        user: {
            userId: number;
            username: string;
        }
    }

}