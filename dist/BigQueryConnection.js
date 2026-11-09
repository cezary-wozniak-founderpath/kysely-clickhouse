"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryConnection = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
class BigQueryConnection {
    #client;
    constructor(config) {
        this.#client = new bigquery_1.BigQuery(config.options);
    }
    async executeQuery(compiledQuery) {
        const options = {
            query: compiledQuery.sql,
            params: [...compiledQuery.parameters],
        };
        const [rows] = await this.#client.query(options);
        return {
            insertId: undefined,
            rows: rows || [],
            numAffectedRows: undefined,
            // @ts-ignore deprecated in kysely >= 0.23, keep for backward compatibility.
            numUpdatedOrDeletedRows: undefined,
        };
    }
    async beginTransaction() {
        throw new Error('Transactions are not supported.');
    }
    async commitTransaction() {
        throw new Error('Transactions are not supported.');
    }
    async rollbackTransaction() {
        throw new Error('Transactions are not supported.');
    }
    async *streamQuery(compiledQuery, chunkSize) {
        const options = {
            query: compiledQuery.sql,
            params: { ...compiledQuery.parameters },
        };
        const stream = await this.#client.createQueryStream(options);
        for await (const row of stream) {
            yield {
                rows: [row],
            };
        }
    }
}
exports.BigQueryConnection = BigQueryConnection;
