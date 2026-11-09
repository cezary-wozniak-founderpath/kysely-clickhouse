"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryIntrospector = void 0;
const kysely_1 = require("kysely");
const bigquery_1 = require("@google-cloud/bigquery");
const bluebird_1 = __importDefault(require("bluebird"));
function freeze(obj) {
    return Object.freeze(obj);
}
class BigQueryIntrospector {
    #db;
    #config;
    #client;
    constructor(db, config) {
        this.#db = db;
        this.#config = config;
        this.#client = new bigquery_1.BigQuery(this.#config.options);
    }
    async getSchemas() {
        const [datasets] = await this.#client.getDatasets();
        return datasets.map(dataset => {
            return freeze({
                name: dataset.id ?? ''
            });
        });
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        const [datasets] = await this.#client.getDatasets();
        const map = {};
        await bluebird_1.default.map(datasets, async ({ id }) => {
            const from = kysely_1.sql.id(id ?? '', 'INFORMATION_SCHEMA', 'COLUMNS');
            const rows = await this.#db
                // @ts-expect-error: dynamic schema 
                .selectFrom(from)
                .selectAll()
                .$castTo()
                .execute();
            for (const row of rows) {
                const { table_schema, table_name, column_name, is_nullable, data_type, column_default } = row;
                const index = `${table_schema}.${table_name}`;
                if (!map[index]) {
                    map[index] = {
                        isView: false,
                        name: table_name,
                        schema: table_schema,
                        columns: []
                    };
                }
                const col = freeze({
                    name: column_name,
                    dataType: data_type,
                    hasDefaultValue: column_default !== 'NULL',
                    isAutoIncrementing: false,
                    isNullable: is_nullable === "YES",
                });
                map[index].columns.push(col);
            }
        });
        return Object.values(map);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
}
exports.BigQueryIntrospector = BigQueryIntrospector;
