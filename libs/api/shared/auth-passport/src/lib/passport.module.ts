import { type DynamicModule, Global, Module } from '@nestjs/common';

import { PassportService } from '@vion/api/auth-passport';

import { PASSPORT_OPTIONS } from './consts';
import type { PassportAsyncOptions, PassportOptions } from './interfaces';
import {
	createPassportAsyncOptionsProvider,
	createPassportOptionsProvider,
} from './passport.providers';

@Global()
@Module({})
export class PassportModule {
	static register(options: PassportOptions): DynamicModule {
		const optionsProvider = createPassportOptionsProvider(options);

		return {
			module: PassportModule,
			providers: [optionsProvider, PassportService],
			exports: [PassportService, PASSPORT_OPTIONS],
		};
	}

	static registerAsync(options: PassportAsyncOptions): DynamicModule {
		const optionsProvider = createPassportAsyncOptionsProvider(options);

		return {
			module: PassportModule,
			imports: options.imports ?? [],
			providers: [optionsProvider, PassportService],
			exports: [PassportService, PASSPORT_OPTIONS],
		};
	}
}
