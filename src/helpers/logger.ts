import { createLogger, format, transports } from 'winston';
const { printf, combine, timestamp, label } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Global' }), timestamp(), myFormat),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.TS_NODE_DEV) {
  logger.add(
    new transports.Console({
      format: combine(label({ label: 'Global' }), timestamp(), myFormat),
    })
  );
}

export default logger;
