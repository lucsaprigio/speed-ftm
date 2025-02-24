import { FormAuth } from "@/components/form-auth";

export default function Home() {
  return (
    <main className="flex gap-3 flex-col items-center justify-center p-20">
      <h2 className="font-bold text-2xl p-3">
        Fazer Login
      </h2>
      <span className="text-md">
        Para começar, digite seu usuário
      </span>
      <FormAuth />
    </main>
  );
}
