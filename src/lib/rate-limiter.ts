import { Redis } from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = new Redis(process.env.REDIS_URL as string);

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 8, // Number of requests
  duration: 60 * 60, // Per hour
});

export async function limitRate(ip: string): Promise<boolean> {
  try {
    await rateLimiter.consume(ip);
    return true; // Request allowed
  } catch (error) {
    console.log(error)
    return false; // Request blocked
  }
}
