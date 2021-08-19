const databases = new Map();
databases.set('pg', 'PostgreSQL');
databases.set('mongo', 'MongoDB');

export const dbLog = (operation: string, msg: string): void =>
  console.log(
    `${
      databases.get(process.env.CURRENT_DB) || 'MongoDB'
    } [${operation}]: ${msg}`,
  );
