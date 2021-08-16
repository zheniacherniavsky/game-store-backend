export default {
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
