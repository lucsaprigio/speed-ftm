/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const signinFormSchema = z.object({
  username: z.string().min(1, 'Digite seu usuário'),
  password: z.string().min(1, 'Digite sua senha')
});

type SignInUserSchema = z.infer<typeof signinFormSchema>;

export function FormAuth() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(signinFormSchema)
  })

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data: SignInUserSchema) {
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      });

      console.log(result);
      if (result?.status === 500) {
        return toast('Internal Server Error', {
          action: {
            label: "Fechar",
            onClick: () => toast.dismiss()
          }
        });
      }

      if (result?.error) {
        return toast('Usuário ou senha incorretas.', {
          action: {
            label: "Fechar",
            onClick: () => toast.dismiss()
          }
        });
      }

      reset();

      return router.replace('/dashboard');

    } catch (error) {
      return toast(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e: any) {
    e.target.value = e.target.value.toUpperCase()
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
          {...register('username', {
            onChange: (e) => handleInputChange(e)
          })}
        />
        {
          errors.username && (
            <label className="absolute mt-1 text-xs text-red-700">
              {errors.username?.message as ReactNode}*
            </label>
          )
        }
      </div>
      <div className="relative">
        <Input
          className="relative border-slate-950"
          placeholder="Digite sua senha"
          type={visible ? 'text' : 'password'}
          {...register('password')}
        />
        {
          visible ? (
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setVisible(!visible)}
            >
              <Eye size={24} />
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setVisible(!visible)}
            >
              <EyeOff size={24} />
            </button>
          )
        }
        {
          errors.password && (
            <label className="absolute mt-1 text-xs text-red-700">
              {errors.password?.message as ReactNode}*
            </label>
          )
        }
      </div>
      <Button
        disabled={loading}
        type="submit"
      >
        {
          loading ? (
            <span>Aguarde...</span>
            // <Loading type='spin' width={32} height={32} color="#FFFFFF" />
          ) : (
            <span>Entrar</span>
          )
        }
      </Button>
    </form>
  )
}