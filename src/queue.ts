import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

export const scraperQueue = new Queue("freelancer-scraper", { connection });
