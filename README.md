# Freelancer Scraper Queue System

This is a Node.js application that performs scheduled scraping of freelancer data using a queue-based architecture powered by [BullMQ](https://docs.bullmq.io/). It uses Redis for job management and node-cron for scheduling jobs periodically.

## Features

- **Data Scraping Scheduler** using `node-cron`
- **Queue-based Execution** with BullMQ for better control and scalability
- **Worker Logic** separated for clean and async-safe task handling
- **Fingerprinting System** to detect new, unchanged, and removed items
- **In-memory Persistence** (can be replaced with a real database)
- **Admin Panel** via `bull-arena` for monitoring queue activity

## Technologies Used

- Node.js
- TypeScript
- Puppeteer
- BullMQ
- Redis
- Node-cron

## Project Structure

```
src/
├── data-scrapping.ts      # Scraper logic using Puppeteer
├── fingerprint.ts         # Unique identifier generation via hashing
├── queue.ts               # BullMQ queue and Redis connection
├── scheduler.ts           # Cron job scheduler
├── storage.ts             # Simple in-memory database (JSON file)
├── worker.ts              # Worker consuming jobs and executing logic
└── index.ts               # App entry point with Arena UI setup
```

