/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebirdError } from "@/AppError/FirebirdError";
import { RegisterSchema } from "@/components/form-register-patrimony";
import { FirebirdService } from '@/firebird/firebird.service';
import { format } from "date-fns";

export async function POST(req: Request) {
    const firebirdService = new FirebirdService();

    try {
        const {
            description,
            price,
            expandedDescription,
            registration,
            registrationDate,
            sector,
            unit,
            userId
        }: RegisterSchema = await req.json();

        const date = format(new Date(), 'dd.MM.yyyy hh:mm');
        const registrationFormatted = format(registrationDate, 'dd.MM.yyyy hh:mm');

        const lastPatrimonyId: any[] = await firebirdService.executeQuery(`SELECT COALESCE(MAX(CD_INVENTARIO), 0) AS CD_INVENTARIO FROM DB_INVENTARIO`, []);

        const newPatrimonyId = lastPatrimonyId[0].CD_INVENTARIO + 1;

        const query = `
        INSERT INTO DB_INVENTARIO 
        (CD_INVENTARIO, DESCRICAO, CD_USUARIO, CD_SETOR, CD_UNIDADE, VALOR, DATA_CADASTRO, MATRICULA, DTA_TRANS, DESCRICAO_EXPANDIDA) VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            newPatrimonyId,
            description,
            userId,
            sector,
            unit,
            parseFloat(price),
            registrationFormatted,
            registration,
            date,
            Buffer.from(expandedDescription, 'binary')
        ];

        await firebirdService.executeTransaction(query, params);

        return Response.json({ message: 'Patrimônio cadastrado com sucesso' }, { status: 201 });

    } catch (error) {
        console.error(error);
        if (error instanceof FirebirdError) {
            return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ error: "Ocorreu um erro" }, { status: 500 });
    }
}