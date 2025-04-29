import knex from 'knex';
import { config } from './env';

const db = knex({
  client: 'pg',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
  },
  pool: {
    min: 2,
    max: 10,
  },
});

export default db;
