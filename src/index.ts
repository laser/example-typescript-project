import { logger } from '~/logger';
import { sleep } from '~/util/sleep';

async function main() {
  logger.info('starting the application');

  process.on('SIGINT', () => {
    logger.info('received SIGINT; shutting down');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logger.info('received SIGTERM; shutting down');
    process.exit(1);
  });

  while (true) {
    logger.info(`the answer is: ${process.env['THE_ANSWER']}`);
    await sleep(1_000);
  }
}

main().catch((err) => {
  logger.error(`main function threw an error: err=${err.toString()}`);
  process.exit(1);
});
