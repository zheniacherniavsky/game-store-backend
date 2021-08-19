/* eslint-disable no-undef */
const srcConfig = {
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: process.env.PG_DB_PORT,
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/src/DA/db/postgresql/entity/**/*.ts'],
  migrations: [__dirname + '/src/DA/db/postgresql/migration/**/*.ts'],
  subscribers: [__dirname + '/src/DA/db/postgresql/subscriber/**/*.ts'],
  cli: {
    entitiesDir: __dirname + '/src/DA/db/postgresql/entity',
    migrationsDir: __dirname + '/src/DA/db/postgresql/migration',
    subscribersDir: __dirname + '/src/DA/db/postgresql/subscriber',
  },
};

const distConfig = {
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: process.env.PG_DB_PORT,
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/dist/DA/db/postgresql/entity/**/*.js'],
  migrations: [__dirname + '/dist/DA/db/postgresql/migration/**/*.js'],
  subscribers: [__dirname + '/dist/DA/db/postgresql/subscriber/**/*.js'],
  cli: {
    entitiesDir: __dirname + '/dist/DA/db/postgresql/entity',
    migrationsDir: __dirname + '/dist/DA/db/postgresql/migration',
    subscribersDir: __dirname + '/dist/DA/db/postgresql/subscriber',
  },
};

module.exports = process.env.TS_NODE_DEV ? srcConfig : distConfig;
