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
    Req,
} from '@nestjs/common'
import { Roles } from 'src/roles.decorator'
import { CompanyService } from './company.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import CompanyEntity from 'src/db/entities/company.entity'
import { DeleteResult } from 'typeorm'

@ApiBearerAuth()
@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Roles('admin', 'owner')
    @Put('admin/company')
    async companyUpdateById(
        @Body('id') userId: number,
        @Body('company') companyData: string
    ): Promise<CompanyEntity> {
        return await this.companyService.update(userId, companyData)
    }

    @Roles('admin', 'owner')
    @Post('admin/company')
    async createCompanyAdmin(
        @Body('id') id: number,
        @Body('data') data: string
    ): Promise<CompanyEntity> {
        return await this.companyService.create(id, data)
    }

    @Roles('admin', 'owner')
    @Get('admin/companies/:id')
    async getCompaniesByUser(@Param() params): Promise<CompanyEntity[]> {
        return await this.companyService.findAll(params.id)
    }

    @Roles('admin', 'owner')
    @Delete('admin/company')
    async deleteByIdAdmin(@Body('id') id: number): Promise<DeleteResult> {
        return await this.companyService.deleteByIdAdmin(id)
    }

    @Roles('admin', 'owner')
    @Get('admin/company/:userId/:companyId')
    async findCompanyById(@Param() params): Promise<CompanyEntity> {
        return await this.companyService.findById(
            params.userId,
            params.companyId
        )
    }

    @Get('company')
    async getCompanies(@Request() req): Promise<CompanyEntity[]> {
        console.log(req.user)
        return await this.companyService.findAll(req.user.id)
    }

    @Get('company/:id')
    async findCompany(@Param('id') id, @Req() req): Promise<CompanyEntity> {
        console.log(req.user)
        return await this.companyService.findById(req.user.id, id)
    }

    @Post('company')
    async createCompany(@Request() req, @Body() data): Promise<CompanyEntity> {
        return await this.companyService.create(req.user.id, data)
    }

    @Put('company')
    async update(@Request() req, @Body() companyData) {
        return await this.companyService.update(req.user.id, companyData)
    }

    @Delete('company')
    async deleteById(@Request() req, @Body('id') companyId: number) {
        return await this.companyService.deleteById(companyId, req.user.id)
    }
}
