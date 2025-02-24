/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                const response = await fetch(env.NEXT_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                })


                const user = response.json();

                return user;
            },
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user?: any }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token.user) {
                session.user = {
                    CNPJ_MATRIZ: token.user.CNPJ_MATRIZ,
                    CNPJ_CLIENTE: token.user.CNPJ_CLIENTE,
                    NOME_CLIENTE: token.user.NOME_CLIENTE,
                    EMAIL_CLIENTE: token.user.EMAIL_CLIENTE
                };
            }
            return session;
        },
    },
}