/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { DatePicker } from './date-picker';
import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const registrationValidation = new RegExp(
    /^\d+$/
);

const registerSchema = z.object({
    description: z.string()
        .min(1, 'Descrição obrigatória')
        .transform(description => { return description.toUpperCase() }),
    // DESCRICAO
    price: z.string()
        .transform(price => {
            return price
                .replaceAll('R$', '')
                .replaceAll('.', '')
                .replaceAll(',', '.')
        }), // VALOR
    registration: z.string()
        .min(1, "Campo obrigatório*")
        .regex(registrationValidation, {
            message: "Por favor digite somente números*"
        }), // MATRICULA
    registrationDate: z.date().refine((date) => date <= new Date(), {
        message: 'A data não pode ser no futuro'
    }),
    expandedDescription: z.string(), // DESCRICAO_EXPANDIDA
    sector: z.number(),
    userId: z.number(),
    unit: z.number()
});

export type RegisterSchema = z.infer<typeof registerSchema>

export function FormRegisterPatrimony() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        setValue } = useForm<RegisterSchema>({
            resolver: zodResolver(registerSchema)
        });

    const registrationDate = watch('registrationDate', new Date());


    function handleSetPrice(value: any) {
        // Remove não números e formata como dinheiro
        value = parseFloat(value.replace(/\D/g, ''));
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value / 100); // Divida por 100 para considerar os centavos

        value = formattedValue

        return formattedValue
    }

    async function handleRegister(data: RegisterSchema) {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(/\D/g, '');
        trigger(e.target.name as keyof RegisterSchema);
    }

    function handleDateChange(date: Date) {
        setValue('registrationDate', date, { shouldValidate: true });
        trigger('registrationDate');
    }

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-[60rem] flex flex-col space-y-6 justify-center bg-slate-200 rounded-md p-10"
        >
            <div className="grid grid-cols-3">
                <DatePicker
                    date={registrationDate}
                    onDateChange={handleDateChange}
                />
            </div>
            <div className='h-3'>
                {errors.registrationDate && (
                    <span className="text-xs text-red-700">
                        {errors.registrationDate.message as ReactNode}
                    </span>
                )}
            </div>

            <div>
                <Input
                    className='relative border-blue-950 w-60'
                    placeholder='Matrícula'
                    {...register('registration', {
                        onChange: (e) => {
                            handleInputChange(e)
                        }
                    })}
                />
                {errors.registration && (
                    <span className="absolute text-xs text-red-700">
                        {errors.registration?.message as ReactNode}
                    </span>
                )}
            </div>
            <div>
                <Input
                    className='relative border-blue-950'
                    placeholder='Descrição'
                    {...register('description')}
                />
                {errors.description && (
                    <span className="absolute text-xs text-red-700">
                        {errors.description?.message as ReactNode}
                    </span>
                )}
            </div>

            <div>
                <Textarea
                    className='border-blue-950'
                    placeholder="Digite em mais detalhes sua descrição"
                    {...register('expandedDescription')}
                />
            </div>
            <div>
                <Input
                    className='w-60 relative border-blue-950'
                    placeholder='R$ 0,00'
                    {...register('price', {
                        onChange: (e) => {
                            const formattedValue = handleSetPrice(e.target.value);
                            setValue('price', formattedValue, { shouldValidate: false })
                        }
                    })}
                />
                {errors.price && (
                    <span className="absolute text-xs text-red-700">
                        {errors.price?.message as ReactNode}
                    </span>
                )}
            </div>
            <div className='mt-8'>
                <Button type='submit'>
                    Cadastrar
                </Button>
            </div>
        </form>
    )
}