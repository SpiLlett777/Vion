import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { createHash } from 'node:crypto';

import { RedisService } from '../infrastructure/redis/redis.service';

@Injectable()
export class OtpService {
	constructor(private readonly redisService: RedisService) {}

	async send(identifier: string, type: 'phone' | 'email') {
		const { code, hash } = this.generateCode();

		await this.redisService.set(`otp:${type}:${identifier}`, hash, 'EX', 300);

		return code;
	}

	async verify(identifier: string, code: string, type: 'phone' | 'email') {
		const storedHash = await this.redisService.get(`otp:${type}:${identifier}`);

		if (!storedHash) throw new RpcException('Invalid or expired code');

		const incomingHash = createHash('sha256').update(code).digest('hex');

		if (storedHash !== incomingHash)
			throw new RpcException('Invalid or expired code');

		await this.redisService.del(`otp:${type}:${identifier}`);
	}

	private generateCode() {
		const code = Math.floor(100_000 + Math.random() * 900_000);
		const hash = createHash('sha256').update(code.toString()).digest('hex');

		return { code, hash };
	}
}
