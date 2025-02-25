import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/auth";
import { FormRegisterPatrimony } from "@/components/form-register-patrimony";
import { getServerSession } from "next-auth";

export default async function Register() {
    const session = await getServerSession(nextAuthOptions);

    return (
        <main className="w-full p-10">
            <section>
                <h2 className="text-2xl font-bold text-center border-b-[1px] border-opacity-10 border-black">Cadastrar</h2>
            </section>
            <div className="flex p-3 space-x-10">
                <strong>Usuário: {session?.user.userId} - {session?.user.username}</strong>
            </div>
            <FormRegisterPatrimony userId={session?.user.userId as number} />
        </main>
    )
}