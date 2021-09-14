import cron from 'node-cron';
import logger from '../helpers/logger';

class Jobs {
  start(): void {
    this.test();
    logger.log({
      level: 'info',
      message: `Jobs was started.`,
    });
  }

  private test(): void {
    cron.schedule('* * * * *', () => {
      logger.log({
        level: 'info',
        message: `Jobs: test message`,
      });
    });
  }
}

export default new Jobs();
