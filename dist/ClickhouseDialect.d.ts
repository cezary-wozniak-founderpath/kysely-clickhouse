import { DatabaseIntrospector, Dialect, Driver, Kysely, QueryCompiler } from 'kysely';
import type { NodeClickHouseClientConfigOptions } from '@clickhouse/client/dist/config';
import { ClickhouseAdapter } from './ClickhouseAdapter';
export interface ClickhouseDialectConfig {
    options?: NodeClickHouseClientConfigOptions;
}
export declare class ClickhouseDialect implements Dialect {
    #private;
    constructor(config?: ClickhouseDialectConfig);
    createAdapter(): ClickhouseAdapter;
    createDriver(): Driver;
    createQueryCompiler(): QueryCompiler;
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}
