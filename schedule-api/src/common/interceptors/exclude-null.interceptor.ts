import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  /**@todo make this recursive for all objects */
  removeNullValues(obj: any) {
    if (!obj) {
      return obj;
    }
    const newObj: any = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (v != null) {
        console.log(v, k, obj[k]);
        newObj[k] = obj[k];
      }
    });
    return newObj;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => this.removeNullValues(value)));
  }
}
