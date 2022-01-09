/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { postgresqlCredentials: data } = require('./secretData');

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
  url: process.env.DATABASE_URL,
  extra: {
    ssl: true,
  },
  entities: [__dirname + '/dist/DA/db/postgresql/entity/**/*.js'],
  migrations: [__dirname + '/dist/DA/db/postgresql/migration/**/*.js'],
  subscribers: [__dirname + '/dist/DA/db/postgresql/subscriber/**/*.js'],
  cli: {
    entitiesDir: __dirname + '/dist/DA/db/postgresql/entity',
    migrationsDir: '/dist/DA/db/postgresql/migration',
    subscribersDir: __dirname + '/dist/DA/db/postgresql/subscriber',
  },
};

module.exports = true ? srcConfig : distConfig;
