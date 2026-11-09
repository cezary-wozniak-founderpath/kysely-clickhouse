"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryDriver = void 0;
const BigQueryConnection_1 = require("./BigQueryConnection");
class BigQueryDriver {
    #config;
    constructor(config) {
        this.#config = config;
    }
    async init() { }
    async acquireConnection() {
        return new BigQueryConnection_1.BigQueryConnection(this.#config);
    }
    async beginTransaction(conn) {
        return await conn.beginTransaction();
    }
    async commitTransaction(conn) {
        return await conn.commitTransaction();
    }
    async rollbackTransaction(conn) {
        return await conn.rollbackTransaction();
    }
    async releaseConnection(_conn) { }
    async destroy() { }
}
exports.BigQueryDriver = BigQueryDriver;
