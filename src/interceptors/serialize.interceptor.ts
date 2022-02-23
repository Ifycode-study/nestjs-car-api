import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { /* plainToClass, */ plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    //console.log('Running before the request handler: ', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        //console.log('Running before response is sent out', data);

        // PlanToClass is depreciated, use plainToInstance instead
        // return plainToClass(UserDto, data, {
        //   excludeExtraneousValues: true,
        // });

        return plainToInstance(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
