import { FirebirdError } from "@/AppError/FirebirdError";
import { FirebirdService } from "@/firebird/firebird.service";
import { UserData } from "@/models/user";

const firebirdService = new FirebirdService();

export async function POST(request: Request) {
    const body = await request.json();

    const {
        username, password
    } = body;

    try {
        const userData: UserData[] = await firebirdService.executeQuery(`
            SELECT 
                CD_USUARIO, NOME_USUARIO
            FROM DB_USUARIOS WHERE NOME_USUARIO = ? AND SENHA = ?
        `, [username.toUpperCase(), password]);

        if (userData.length === 0) {
            return new Response(JSON.stringify({ message: "Usuário ou senha incorretas." }), { status: 404 })
        }

        const user = userData.map((item) => ({
            userId: item.CD_USUARIO,
            username: item.NOME_USUARIO,
        }))[0];

        return Response.json(user, { status: 200 });
    } catch (error) {
        console.log(error)
        if (error instanceof FirebirdError) {
            return Response.json({ error: { ...error, message: error.message } }, { status: 500 });
        }
        return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}