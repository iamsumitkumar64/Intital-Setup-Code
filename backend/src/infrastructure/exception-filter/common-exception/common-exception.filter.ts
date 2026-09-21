import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from 'src/domain/common/exception';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | string[];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception.getResponse() as any).message || exception.message;
    } else if (exception instanceof DomainException) {
      const domainEx = exception as DomainException;
      status = domainEx.statusCode;
      message = domainEx.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const formattedResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    }
    if (exception) {
      console.log('\nException -> ', exception, '\nFormatted Exception -> ', formattedResponse);
    }

    return response.status(status).json(formattedResponse);
  }
}
