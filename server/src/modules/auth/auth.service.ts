import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from '../user/dto/login-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(userData: LoginUserDto): Promise<any> {
        const user = await this.usersService.findOne(userData)
        if (user) {
            return user
        }
        return null
    }

    async login(user: LoginUserDto) {
        const userData = await this.validateUser(user)
        if (!userData) return null
        const payload = {
            roles: userData.roles,
            email: userData.email,
            id: userData.id,
            username: userData.username,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
