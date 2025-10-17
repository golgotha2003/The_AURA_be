import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { redisConfig } from "./redis.config";

@Injectable()
export class RedisService {
    private redis: Redis;

    constructor() {
        console.log(`redis config: ${JSON.stringify(redisConfig)}`);

        this.redis = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
        });

        this.redis.on('connect', () => {
            console.log('Redis connected');
        });

        this.redis.on('error', (error) => {
            console.error('Redis error:', error);
        });
    }

    async setToken(user: string, deviceId: string, token: string) {
        const key = `token:${user}:${deviceId}`;
        await this.redis.set(key, token, 'EX', 60 * 60 * 24);
    }

    async getToken(user: string, deviceId: string) {
        const key = `token:${user}:${deviceId}`;
        return await this.redis.get(key);
    }
    
    async delToken(user: string, deviceId: string) {
        const key = `token:${user}:${deviceId}`;
        await this.redis.del(key);
    }

    async setOTP(user: string, otp: string, type: string) {
        const key = `otp:${user}:${type}`;
        await this.redis.set(key, otp, 'EX', 60 * 5);
    }

    async getOTP(user: string, type: string) {
        const key = `otp:${user}:${type}`;
        return await this.redis.get(key);
    }

    async delOTP(user: string, type: string) {
        const key = `otp:${user}:${type}`;
        await this.redis.del(key);
    }
}