import { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely';
import { BigQueryDialectConfig } from '.';
export declare class BigQueryConnection implements DatabaseConnection {
    #private;
    constructor(config: BigQueryDialectConfig);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
}
