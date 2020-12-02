import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
    Controller,
    UsePipes,
    UseGuards,
    Request,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserData } from './user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { AuthService } from '../auth/auth.service'
import { UserAD } from '../user/user.interface'
import { Public } from '../../public.decorator'
import { Roles } from 'src/roles.decorator'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import UserEntity from 'src/db/entities/user.entity'
import { SSL_OP_EPHEMERAL_RSA } from 'constants'

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ) {}

    @Roles('owner')
    @Post('admin/register')
    async register(
        @Body('email') email: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('roles') roles: string
    ) {
        return this.userService.create(
            {
                email: email,
                password: password,
                username: username,
            },
            roles
        )
    }

    @Roles('admin', 'owner')
    @Put('admin/role')
    async profileUpdateById(
        @Body('id') userId: number,
        @Body('user') userData: string
    ) {
        return await this.userService.update(userId, userData)
    }

    @Roles('owner')
    @Post('admin/role')
    async profileAddRole(
        @Body('id') userId: number,
        @Body('role') role: string
    ) {
        return await this.userService.addRole(userId, role)
    }

    @Roles('owner')
    @Delete('admin/role')
    async profileRemoveRole(
        @Body('id') userId: number,
        @Body('role') role: string
    ) {
        return await this.userService.removeRole(userId, role)
    }

    @Roles('admin', 'owner')
    @Delete('admin/profile')
    async deleteById(@Body('id') id: number) {
        return await this.userService.deleteById(id)
    }

    @Roles('admin', 'owner')
    @Get('admin/profile/:id')
    async findProfileById(@Param() params): Promise<UserEntity> {
        return await this.userService.findById(params.id)
    }

    @Get('profile')
    async findMe(@Request() req): Promise<UserEntity> {
        return await this.userService.findById(req.user.id)
    }

    @Put('profile')
    async update(@Request() req, @Body() userData) {
        return await this.userService.update(req.user.id, userData)
    }

    @Delete('profile')
    async delete(@Request() req) {
        return await this.userService.deleteById(req.user.id)
    }

    @Public()
    @Post('signup')
    async create(
        @Body('email') email: string,
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        return this.userService.create(
            {
                email: email,
                password: password,
                username: username,
            },
            null
        )
    }

    @Public()
    @Post('signin')
    async login(@Body('') loginUserDto: LoginUserDto): Promise<UserAD> {
        const _user = await this.userService.findOne(loginUserDto)

        const errors = { User: ' not found' }
        if (!_user) throw new HttpException({ errors }, 402)

        const token = await (await this.authService.login(loginUserDto))
            .access_token
        const {
            id,
            email,
            username,
            description,
            image,
            firstName,
            lastName,
        } = _user
        const user = {
            id,
            email,
            token,
            username,
            description,
            image,
            firstName,
            lastName,
        }
        return user
    }

    @Get('logout')
    async logout(@Request() req) {
        req.logout()
        return 'Logged out'
    }
}
