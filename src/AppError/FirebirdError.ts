export class FirebirdError extends Error {
    public statusCode: number;
    public firebirdCode: number;

    constructor(message: string, statusCode: number, firebirdCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.firebirdCode = firebirdCode;
        this.name = 'FirebirdError';
    }
}