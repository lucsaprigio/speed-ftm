import { FirebirdService } from "@/firebird/firebird.service";

const firebirdService = new FirebirdService();

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const user = await firebirdService.executeQuery(`
            SELECT 
                *
            FROM DB_USUARIOS WHERE NOME_USUARIO = '${username}' AND SENHA_USUARIO = '${password}'
        `, []);

        if (!user) {
            return new Response(JSON.stringify({message: "Usuário ou senha incorretas."}))
        }

        return Response.json({ user })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}