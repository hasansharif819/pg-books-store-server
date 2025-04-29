"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const env_1 = require("./env");
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: env_1.config.db.host,
        port: env_1.config.db.port,
        user: env_1.config.db.user,
        password: env_1.config.db.password,
        database: env_1.config.db.name,
    },
    pool: {
        min: 2,
        max: 10,
    },
});
exports.default = db;
