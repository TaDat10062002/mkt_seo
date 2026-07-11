import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ResourceNotFoundError } from '../errors/not-found.error';

@Catch(ResourceNotFoundError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost) {
    host.switchToHttp().getResponse().status(HttpStatus.NOT_FOUND).send({ statusCode: 404, message: exception.message });
  }
}
