"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryDialect = void 0;
const kysely_1 = require("kysely");
const BigQueryDriver_1 = require("./BigQueryDriver");
const BigQueryIntrospector_1 = require("./BigQueryIntrospector");
class BigQueryDialect {
    #config;
    constructor(config) {
        this.#config = config ?? {};
    }
    createAdapter() {
        return new kysely_1.MysqlAdapter();
    }
    createDriver() {
        return new BigQueryDriver_1.BigQueryDriver(this.#config);
    }
    createQueryCompiler() {
        return new kysely_1.MysqlQueryCompiler();
    }
    createIntrospector(db) {
        return new BigQueryIntrospector_1.BigQueryIntrospector(db, this.#config);
    }
}
exports.BigQueryDialect = BigQueryDialect;
