'use client';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

const handleSigninFormSchema = z.object({
  username: z.string().min(1, 'Digite seu usuário'),
  password: z.string().min(1, 'Digite sua senha')
});

export function FormAuth() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(handleSigninFormSchema)
  })

  const router = useRouter();

  function handleSignIn() {
    return router.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="max-md:w-full flex flex-col w-4/12 justify-center h-[36rem] space-y-8 border-[1px] rounded-md p-7 bg-slate-300 shadow-md">
      <div className="flex flex-col items-center justify-center space-y-8">
        <LogIn
          className="border-[1px] rounded-full p-3 border-slate-950 shadow-lg"
          size={48}
        />
        <h2 className="font-bold text-2xl">
          Faça Login
        </h2>
        <span className="text-md">
          Para começar, digite seu usuário
        </span>
      </div>
      <div>
        <Input
          className="relative border-slate-950"
          placeholder="Exemplo: Lucas"
          {...register('username')}
        />
        {
          errors.username && (
            <label className="absolute mt-1 text-xs text-red-700">
              {errors.username?.message as ReactNode}*
            </label>
          )
        }
      </div>
      <div>
        <Input
          className="relative border-slate-950"
          placeholder="Digite sua senha"
          type="password"
          {...register('password')}
        />
        {
          errors.username && (
            <label className="absolute mt-1 text-xs text-red-700">
              {errors.password?.message as ReactNode}*
            </label>
          )
        }
      </div>
      <Button type="submit">
        Entrar
      </Button>
    </form>
  )
}