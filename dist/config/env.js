"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const joi_1 = __importDefault(require("joi"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid('development', 'production', 'test').required(),
    PORT: joi_1.default.number().default(5000),
    DB_HOST: joi_1.default.string().default(process.env.POSTGRES_DEV_HOST),
    DB_PORT: joi_1.default.number().default(Number(process.env.POSTGRES_DEV_PORT)),
    DB_USER: joi_1.default.string().default(process.env.POSTGRES_DEV_USER),
    DB_PASSWORD: joi_1.default.string().default(process.env.POSTGRES_DEV_PASSWORD),
    DB_NAME: joi_1.default.string().default(process.env.POSTGRES_DEV_DATABASE),
    JWT_SECRET: joi_1.default.string().required(),
})
    .unknown();
const { value: envVars, error } = envSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    env: envVars.NODE_ENV, // ✅ Add this line
    port: envVars.PORT,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_NAME,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
    },
};
