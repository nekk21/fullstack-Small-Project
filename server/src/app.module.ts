import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { Connection } from 'typeorm'
import UserEntity from './db/entities/user.entity'
import { APP_GUARD } from '@nestjs/core'
import { IS_JWT } from 'class-validator'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { config } from '../ormconfig'
import { CompanyModule } from './modules/company/company.module'
import { RolesGuard } from './modules/auth/guards/roles.guard'
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        CompanyModule,
        MulterModule.register({
            dest: './files',
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
