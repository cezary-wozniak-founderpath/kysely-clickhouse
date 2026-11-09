import { Kysely, DatabaseIntrospector, DatabaseMetadata, DatabaseMetadataOptions, SchemaMetadata, TableMetadata } from 'kysely';
import { BigQueryDialectConfig } from '.';
export declare class BigQueryIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>, config: BigQueryDialectConfig);
    getSchemas(): Promise<SchemaMetadata[]>;
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}
