import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const logger = new Logger('Bootstrap');

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api/v1');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);

	const origins = configService
		.get<string>('CORS_ORIGINS', '')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);

	app.enableCors({
		origin: origins.length ? origins : true,
	});

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Marketing SEO Management API')
		.setVersion('1.0')
		.build();

	SwaggerModule.setup(
		'api/docs',
		app,
		SwaggerModule.createDocument(app, swaggerConfig),
	);

	const port = Number(process.env.PORT) || 3000;

	await app.listen(port, '0.0.0.0');

	logger.log(`API: http://localhost:${port}/api/v1`);
	logger.log(`Swagger: http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
	console.error(error);
	process.exit(1);
});