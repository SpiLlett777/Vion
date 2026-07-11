import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getData(): { message: string } {
		return { message: 'Welcome to Vion API!' };
	}

	health() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
		};
	}
}
