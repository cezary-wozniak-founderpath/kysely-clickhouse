import { DatabaseConnection, Driver } from 'kysely';
import { BigQueryDialectConfig } from '.';
import { BigQueryConnection } from './BigQueryConnection';
export declare class BigQueryDriver implements Driver {
    #private;
    constructor(config: BigQueryDialectConfig);
    init(): Promise<void>;
    acquireConnection(): Promise<DatabaseConnection>;
    beginTransaction(conn: BigQueryConnection): Promise<void>;
    commitTransaction(conn: BigQueryConnection): Promise<void>;
    rollbackTransaction(conn: BigQueryConnection): Promise<void>;
    releaseConnection(_conn: BigQueryConnection): Promise<void>;
    destroy(): Promise<void>;
}
