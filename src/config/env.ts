import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    PORT: Joi.number().default(5000),
    DB_HOST: Joi.string().default(process.env.POSTGRES_DEV_HOST),
    DB_PORT: Joi.number().default(Number(process.env.POSTGRES_DEV_PORT)),
    DB_USER: Joi.string().default(process.env.POSTGRES_DEV_USER),
    DB_PASSWORD: Joi.string().default(process.env.POSTGRES_DEV_PASSWORD),
    DB_NAME: Joi.string().default(process.env.POSTGRES_DEV_DATABASE),
    JWT_SECRET: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
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
