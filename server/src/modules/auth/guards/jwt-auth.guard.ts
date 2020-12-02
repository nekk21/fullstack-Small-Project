import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../../public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (isPublic) {
            return true
        }
        return super.canActivate(context)
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
