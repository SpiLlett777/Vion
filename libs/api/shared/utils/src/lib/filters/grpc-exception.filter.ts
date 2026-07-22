import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

import type { Response } from 'express';

import { grpcToHttpStatus } from '../mappers';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (this.isGrpcError(exception)) {
			const status = grpcToHttpStatus[exception.code] || 500;

			return response.status(status).json({
				statusCode: status,
				message: exception.details || 'gRPC Error',
			});
		}

		if (exception instanceof HttpException) {
			const status = exception.getStatus();

			return response.status(status).json({
				statusCode: status,
				message: exception.message || 'gRPC Error',
			});
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: 500,
			message: 'Internal Server Error',
		});
	}

	private isGrpcError(exception: any) {
		return (
			typeof exception === 'object' &&
			'code' in exception &&
			'details' in exception
		);
	}
}
