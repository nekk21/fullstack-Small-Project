import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Res,
    Req,
    Param,
    HttpException,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import {
    editFileName,
    imageFileFilter,
    editFileNameAdmin,
    editLogoName,
} from './utils/file-upload.utils'
import { AppService } from './app.service'
import { UserService } from './modules/user/user.service'
import { CompanyService } from './modules/company/company.service'
import { Roles } from './roles.decorator'
import { Body } from '@nestjs/common'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
        private readonly companyService: CompanyService
    ) {}

    @Post('user/avatar')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedFile(@UploadedFile() file, @Req() req) {
        if (!file) {
            throw new HttpException('Provide image in body', 400)
        }
        const user = await this.userService.updateImage(
            req.user.id,
            file.filename.split('/')[file.filename.split('/').length - 1]
        )
        const response = {
            originalname: file.originalname,
            filename: user.image,
        }
        return response
    }

    @Get('user/avatar/')
    async seeUploadedFile(@Req() req, @Res() res) {
        const filename = await this.userService.getImageName(req.user.id)
        if (!filename) {
            return res.json({ message: "User doesn't have avatar yet" })
        }
        return res.sendFile(`${filename}`, {
            root: './files/avatar',
        })
    }

    @Roles('admin', 'owner')
    @Post('user/admin/avatar')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileNameAdmin,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedFileAdmin(@UploadedFile() file, @Req() req) {
        if (!file) {
            throw new HttpException('Provide image in body', 400)
        }
        const user = await this.userService.updateImage(
            req.user.id,
            file.filename.split('/')[file.filename.split('/').length - 1]
        )
        const response = {
            originalname: file.originalname,
            filename: user.image,
        }
        return response
    }

    @Roles('admin', 'owner')
    @Get('user/admin/avatar/:userId')
    async seeUploadedFileAdmin(@Param() param, @Res() res) {
        const filename = await this.userService.getImageName(param.userId)
        if (!filename) {
            return res.json({ message: "User doesn't have avatar yet" })
        }
        return res.sendFile(`${filename}`, {
            root: './files/avatar',
        })
    }

    @Post('company/logo')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editLogoName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedLogo(
        @UploadedFile() file,
        @Req() req,
        @Body('id') companyId
    ) {
        if (!file) {
            throw new HttpException('Provide image in body', 400)
        }
        const user = await this.companyService.updateImage(
            companyId,
            req.user.id,
            file.filename.split('/')[file.filename.split('/').length - 1]
        )
        const response = {
            originalname: file.originalname,
            filename: user.image,
        }
        return response
    }

    @Get('company/logo/:id')
    async seeUploadedLogo(@Param() param, @Req() req, @Res() res) {
        const filename = await this.companyService.getImageName(
            req.user.id,
            param.id
        )
        if (!filename) {
            return res.json({ message: "Company doesn't have logo yet" })
        }
        return res.sendFile(`${filename}`, {
            root: './files/logo',
        })
    }

    @Roles('admin', 'owner')
    @Post('company/admin/logo')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editLogoName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedLogoAdmin(@UploadedFile() file, @Body() body) {
        if (!file) {
            throw new HttpException('Provide image in body', 400)
        }
        const user = await this.companyService.updateImage(
            body.companyId,
            body.userId,
            file.filename.split('/')[file.filename.split('/').length - 1]
        )
        const response = {
            originalname: file.originalname,
            filename: user.image,
        }
        return response
    }

    @Roles('admin', 'owner')
    @Get('company/admin/logo/:userId/:companyId')
    async seeUploadedLogoAdmin(@Param() param, @Res() res) {
        const filename = await this.companyService.getImageName(
            param.userId,
            param.companyId
        )
        if (!filename) {
            return res.json({ message: "Company doesn't have logo yet" })
        }
        return res.sendFile(`${filename}`, {
            root: './files/logo',
        })
    }
}
