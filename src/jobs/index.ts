import cron from 'node-cron';
import { RatingRepository } from '../DA';
import logger from '../helpers/logger';

class Jobs {
  start(): void {
    this.cleanupLastRatings();
    logger.log({
      level: 'info',
      message: `Jobs was started.`,
    });
  }

  private cleanupLastRatings(): void {
    cron.schedule('0 0 * * 1', () => {
      RatingRepository.cleanupLastRatings();
      logger.log({
        level: 'info',
        message: `Jobs: last ratings was cleaned`,
      });
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
