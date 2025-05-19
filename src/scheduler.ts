import cron from "node-cron";
import { scraperQueue } from "./queue";

const JOB_NAME = "freelancer-scrape";

export const startScheduler = () => {
  cron.schedule("*/10 * * * * *", async () => {
    await scraperQueue.add(
      JOB_NAME,
      {},
      { removeOnComplete: true, removeOnFail: true }
    );
  });
};
