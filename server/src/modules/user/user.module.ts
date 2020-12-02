import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from '../../db/entities/user.entity'
import { UserService } from './user.service'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule {
    public configure() {}
}
