'use client';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

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
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col space-y-8 w-96 border-[1px] rounded-md border-black p-7">
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