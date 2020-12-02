import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import fs = require('fs')

async function bootstrap() {
    if (!fs.existsSync(__dirname + '\\..\\..\\files\\avatar')) {
        fs.mkdirSync(__dirname + '\\..\\..\\files\\avatar')
    }
    if (!fs.existsSync(__dirname + '\\..\\..\\files\\logo')) {
        fs.mkdirSync(__dirname + '\\..\\..\\files\\logo')
    }
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    )

    //app.useGlobalGuards(JwtAuthGuard);

    const options = new DocumentBuilder()
        .setTitle('Company Management')
        .setDescription('The company-management API')
        .setVersion('0.1.0')
        .addTag('company')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(8080)
}
bootstrap()
