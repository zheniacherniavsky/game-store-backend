export const dbLog = (database: string, operation: string, msg: string): void =>
  console.log(`${database} [${operation}]: ${msg}`);
