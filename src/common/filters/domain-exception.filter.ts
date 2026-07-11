import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Error as MongooseError, mongo } from 'mongoose';
import { ResourceNotFoundError } from '../errors/not-found.error';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const { statusCode, message } = this.mapException(exception);

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    }

    response.status(statusCode).send({ statusCode, message });
  }

  private mapException(exception: unknown): { statusCode: number; message: string | object } {
    if (exception instanceof ResourceNotFoundError) {
      return { statusCode: HttpStatus.NOT_FOUND, message: exception.message };
    }

    if (exception instanceof HttpException) {
      return { statusCode: exception.getStatus(), message: exception.getResponse() };
    }

    if (exception instanceof mongo.MongoServerError && exception.code === 11000) {
      return { statusCode: HttpStatus.CONFLICT, message: 'A record with the same unique value already exists' };
    }

    if (exception instanceof MongooseError.ValidationError) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Database validation failed' };
    }

    if (exception instanceof MongooseError.CastError) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid identifier or field value' };
    }

    return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
  }
}
