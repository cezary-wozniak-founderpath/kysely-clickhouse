import { DatabaseIntrospector, Dialect, Driver, Kysely, MysqlAdapter, QueryCompiler } from 'kysely';
import { BigQueryOptions } from '@google-cloud/bigquery';
export interface BigQueryDialectConfig {
    options?: BigQueryOptions;
}
export declare class BigQueryDialect implements Dialect {
    #private;
    constructor(config?: BigQueryDialectConfig);
    createAdapter(): MysqlAdapter;
    createDriver(): Driver;
    createQueryCompiler(): QueryCompiler;
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}
