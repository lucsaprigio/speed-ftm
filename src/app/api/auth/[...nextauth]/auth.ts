/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from "@/env";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// LEMBRAR DE COLOCAR O ENV NEXTAUTH_URL NO .ENV
export const nextAuthOptions: AuthOptions = {
    session: {
        maxAge: 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'text' }
            },

            async authorize(credentials) {
                const response = await fetch(`${env.NEXT_API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                });

                if (response.status === 500) {
                    return null
                }

                if (!response.ok) {
                    return null
                }

                const user = await response.json();

                return user;

            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
}