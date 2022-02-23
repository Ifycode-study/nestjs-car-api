import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { /* plainToClass, */ plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  //new (...args: any[]): {}; //my editor keeps closing up the space after the new keyword on save

  // eslint-disable-next-line @typescript-eslint/ban-types
  new(...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

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

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
