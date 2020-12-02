import { Module, NestModule, RequestMethod } from '@nestjs/common'
import { CompanyController } from './company.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import CompanyEntity from '../../db/entities/company.entity'
import { AuthModule } from '../auth/auth.module'
import { CompanyService } from './company.service'
import { UserService } from '../user/user.service'
import UserEntity from '../../db/entities/user.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
    ],
    providers: [CompanyService, UserService],
    controllers: [CompanyController],
    exports: [CompanyService],
})
export class CompanyModule {}
