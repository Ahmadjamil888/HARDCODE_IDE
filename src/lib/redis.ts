import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const buildQueue = new Queue('build-queue', { connection });
export const flashQueue = new Queue('flash-queue', { connection });
export const testQueue = new Queue('test-queue', { connection });

// Example implementation of a worker (usually in a separate file/process)
export const createWorker = (queueName: string, processor: (job: Job) => Promise<any>) => {
  return new Worker(queueName, processor, { connection });
};

export default connection;
