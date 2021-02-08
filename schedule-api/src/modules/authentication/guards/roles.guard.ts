import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import RequestWithUser from '../interfaces/request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => !!roles.find((item) => item === user.role);

    return user && user.role && hasRole();
  }
}
