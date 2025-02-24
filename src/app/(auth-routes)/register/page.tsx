import { FormRegisterPatrimony } from "@/components/form-register-patrimony";

export default function Register() {
    return (
        <main className="w-full p-10">
            <section>
                <h2 className="text-2xl font-bold text-center border-b-[1px] border-opacity-10 border-black">Cadastrar Patrimônio</h2>
            </section>
            <div className="flex p-3 space-x-10">
                <strong>Usuário: 1 - Lucas</strong>
                <strong>Setor: Teste</strong>
                <strong>Unidade: 1 - Teste</strong>
            </div>
            <FormRegisterPatrimony />
        </main>
    )
}