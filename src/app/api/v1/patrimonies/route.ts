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

        const date = format(new Date(), 'dd/MM/yyyy hh:mm');
        const registrationFormatted = format(registrationDate, 'dd/MM/yyyy hh:mm');

        const lastPatrimonyId = await firebirdService.executeQuery(`SELECT COALESCE(MAX(CD_INVENTARIO) FROM DB_INVENTARIO`, []);

        const patrimony = await firebirdService.executeTransaction(
            `INSERT INTO DB_INVENTARIO 
            (CD_INVENTARIO, DESCRICAO, CD_USUARIO, CD_SETOR, CD_UNIDADE, VALOR, DATA_CADASTRO, MATRICULA, DTA_TRANS, DESCRICAO_EXPANDIDA) VALUES 
            (${lastPatrimonyId}, '${description}', ${userId}, ${sector}, ${unit}, ${price}, '${registrationFormatted}', '${registration}', '${date}', ${expandedDescription})
            RETURNING ID`, []);

        return new Response(JSON.stringify({
            description,
            price,
            expandedDescription,
            registration,
            registrationDate,
            sector,
            unit,
            userId
        }), { status: 201 })


    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}