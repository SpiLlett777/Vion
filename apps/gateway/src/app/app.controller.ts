import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { HealthResponse } from '@vion/shared/dto';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		summary: 'Welcome Endpoint',
		description: 'Returns a simple API welcome message.',
	})
	@Get()
	getData() {
		return this.appService.getData();
	}

	@ApiOperation({
		summary: 'Health Check',
		description: 'Checks if the Gateway is running.',
	})
	@ApiOkResponse({
		type: HealthResponse,
	})
	@Get('health')
	getStatus() {
		return this.appService.health();
	}
}
