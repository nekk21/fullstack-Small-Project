import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler()
        )
        const request = context.switchToHttp().getRequest()
        const user = request.user
        if (!roles) {
            return true
        }
        if (!user.roles) {
            return false
        }
        return this.matchRoles(roles, user.roles.split(','))
    }

    matchRoles(str1: string[], str2: string[]): boolean {
        for (let i = 0; i < str1.length; i++) {
            for (let j = 0; j < str2.length; j++) {
                if (!str1[i].localeCompare(str2[j])) {
                    return true
                }
            }
        }
        return false
    }
}
