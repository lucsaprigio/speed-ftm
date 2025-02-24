import { env } from "@/env";
import { DatabaseOptions } from "./DatabaseOptions";
import firebird from 'node-firebird';

class FirebirdService {
    private options: DatabaseOptions;

    constructor() {
        this.options = {
            host: env.DB_HOST,
            port: env.DB_PORT,
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD
        }
    }

    async executeTransaction(ssql: string, params: []): Promise<[]> {
        return new Promise<[]>((resolve, reject) => {
            try {
                firebird.attach(this.options, (err, db) => {
                    if (err) {
                        return reject(err);
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
                                    return reject(err);
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

    async executeQuery(query: string, params: []): Promise<[]> {
        return new Promise<[]>((resolve, reject) => {
            firebird.attachOrCreate(this.options, (err, db) => {
                if (err) {
                    return reject(err)
                }

                db.query(query, params, (err, result) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(result as [])
                })
            })
        })
    }

}

export default FirebirdService;