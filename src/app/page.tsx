import { FormAuth } from "@/components/form-auth";

export default function Home() {
  return (
    <main className="flex h-screen gap-3 flex-col items-center justify-center p-20 bg-gradient-to-b from-blue-950 to-blue-800">
      <FormAuth />
    </main>
  );
}
