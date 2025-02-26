/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { DatabaseOptions } from "./DatabaseOptions";
import firebird from 'node-firebird';
import { FirebirdError } from "@/AppError/FirebirdError";

class FirebirdService {
    private options: DatabaseOptions;

    constructor() {
        this.options = {
            host: env.DB_HOST,
            port: parseInt(env.DB_PORT),
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD
        }
    }

    async executeTransaction(ssql: string, params: any[]): Promise<[]> {
        return new Promise<[]>((resolve, reject) => {
            try {
                firebird.attach(this.options, (err, db) => {
                    if (err) {
                        return reject(new FirebirdError({ message: err.message, originalError: err.error }, 500, err.gdscode));
                    };

                    db.transaction(firebird.ISOLATION_READ_COMMITTED, async (err, transaction) => {
                        if (err) {
                            db.detach();
                            return reject(err);
                        };

                        transaction.query(ssql, params, (err, result) => {
                            if (err) {
                                transaction.rollback(() => {
                                    db.detach();
                                    return reject(new FirebirdError({ message: err.message, originalError: err.error }, 500, err.gdscode));
                                });
                            } else {
                                transaction.commit(() => {
                                    db.detach();
                                    return resolve(result as []);
                                })
                            };
                        })
                    })
                })
            } catch (error) {
                throw new Error(String(error));
            }
        })
    }

    async executeQuery(query: string, params: any[]): Promise<[]> {
        return new Promise<[]>((resolve, reject) => {
            firebird.attachOrCreate(this.options, (err, db) => {
                if (err) {
                    console.log(err)
                    return reject(new FirebirdError({ message: err.message, originalError: err.error }, 500, err.gdscode))
                }

                db.query(query, params, (err, result) => {
                    if (err) {
                        return reject(new FirebirdError({ message: err.message, originalError: err.error }, 500, err.gdscode))
                    }

                    return resolve(result as [])
                })
            })
        })
    }

}

export { FirebirdService };