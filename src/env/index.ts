import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'dev', 'production']).default('development'),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_DATABASE: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    NEXT_API_URL: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXTAUTH_URL: z.string()
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.log(_env)

    console.error('❌ Invalid environment variables: ', _env.error.format());

    throw new Error('Invalid environment variables');
}

export const env = _env.data;

