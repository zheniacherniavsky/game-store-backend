/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
console.log('process.env.TS_NODE_DEV', process.env.TS_NODE_DEV);
const { postgresqlCredentials: data = {} } = process.env.TS_NODE_DEV == 'true' ? require('./secretData') : {};

const srcConfig = {
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: process.env.PG_DB_PORT,
  username: data.PG_DB_USERNAME || '',
  password: data.PG_DB_PASSWORD || '',
  database: process.env.PG_DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/src/DA/db/postgresql/entity/**/*.ts'],
  migrations: [__dirname + '/src/DA/db/postgresql/migration/**/*.ts'],
  subscribers: [__dirname + '/src/DA/db/postgresql/subscriber/**/*.ts'],
  cli: {
    entitiesDir: __dirname + '/src/DA/db/postgresql/entity',
    migrationsDir: '/src/DA/db/postgresql/migration',
    subscribersDir: __dirname + '/src/DA/db/postgresql/subscriber',
  },
};

const distConfig = {
  type: 'postgres',
  synchronize: true,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/dist/DA/db/postgresql/entity/**/*.js'],
  migrations: [__dirname + '/dist/DA/db/postgresql/migration/**/*.js'],
  subscribers: [__dirname + '/dist/DA/db/postgresql/subscriber/**/*.js'],
  cli: {
    entitiesDir: __dirname + '/dist/DA/db/postgresql/entity',
    migrationsDir: '/dist/DA/db/postgresql/migration',
    subscribersDir: __dirname + '/dist/DA/db/postgresql/subscriber',
  },
};

module.exports = process.env.TS_NODE_DEV ? srcConfig : distConfig;
