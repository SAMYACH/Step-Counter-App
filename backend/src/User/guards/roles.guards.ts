/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const reqObj = context.switchToHttp().getRequest();
    console.log('role guard .....', reqObj);
    console.log('_______________________________________');
    console.log('User Req .....', reqObj.user);
    return requiredRoles.some((role) => reqObj.user.role.includes(role));
  }
}
