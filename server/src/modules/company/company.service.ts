import { Injectable } from '@nestjs/common'
import CompanyEntity from '../../db/entities/company.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import { UpdateCompanyDto } from './dto/update-company.dto'
import UserEntity from '../../db/entities/user.entity'
import { validate } from 'class-validator'
import { HttpStatus } from '@nestjs/common'
import fs = require('fs')

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(id: number): Promise<CompanyEntity[]> {
        return await this.companyRepository.find({ where: { user: id } })
    }

    async deleteByName(name: string): Promise<DeleteResult> {
        return await this.companyRepository.delete({ name: name })
    }

    async deleteByIdAdmin(id: number): Promise<DeleteResult> {
        return this.companyRepository.delete(id)
    }

    async deleteById(id: number, userId: number): Promise<DeleteResult> {
        const company = await this.companyRepository.findOne({
            relations: ['user'],
            where: {
                id: id,
                user: { id: userId },
            },
        })
        if (!company) {
            const errors = { Company: 'Company is not found' }
            throw new HttpException({ errors }, 402)
        }
        await fs.unlink(
            `${__dirname}/../../../../files/logo/${company.image}`,
            err => {
                if (err) console.log(err)
            }
        )
        return this.companyRepository.delete(company.id)
    }

    async findById(userId: number, companyId: number): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            relations: ['user'],
            where: {
                id: companyId,
                user: { id: userId },
            },
        })

        if (!company) {
            const errors = { Company: 'Company is not found' }
            throw new HttpException({ errors }, 402)
        }

        return company
    }

    async findByName(name: string): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            where: { name: name },
        })
        if (!company) {
            const errors = { Company: 'Company is not found' }
            throw new HttpException({ errors }, 402)
        }

        return company
    }

    async create(id: number, data): Promise<CompanyEntity> {
        const company: CompanyEntity = data
        const user = await this.userRepository.findOne(id)
        if (!user) {
            const errors = { user: 'User not found' }
            throw new HttpException({ errors }, 402)
        }
            company.user = user
            company.image = ''
        
        const errors = await validate(company)
        if (errors.length > 0) {
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }
        try {
            return await this.companyRepository.save(company)
        } catch (error) {
            throw new HttpException(
                { message: 'Query Error', error },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async update(id: number, data): Promise<CompanyEntity> {
        const dto: UpdateCompanyDto = data
        const company = await this.companyRepository.findOne({
            relations: ['user'],
            where: {
                id: dto.id,
                user: { id: id },
            },
        })
        if (!company) {
            const errors = { update: ' cant update of : undefined' }
            throw new HttpException({ errors }, 400)
        }
        if (dto.name) {
            company.name = dto.name
        }
        if (dto.description) {
            company.description = dto.description
        }
        if (dto.address) {
            company.address = dto.address
        }
        if (dto.serviceOfActivity) {
            company.serviceOfActivity = dto.serviceOfActivity
        }
        if (dto.numberOfEmployees) {
            company.numberOfEmployees = dto.numberOfEmployees
        }
        if (dto.type) {
            company.type = dto.type
        }

        return await this.companyRepository.save(company)
    }

    async updateImage(
        id: number,
        userId: number,
        filename: string
    ): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            relations: ['user'],
            where: {
                id: id,
                user: { id: userId },
            },
        })
        if (!company) {
            await fs.unlink(
                `${__dirname}/../../../../files/logo/${filename}`,
                err => {
                    if (err) console.log(err)
                }
            )
            throw new HttpException('Cannot find company with provided id', 400)
        }
        if (company.image)
            await fs.unlink(
                `${__dirname}/../../../../files/logo/${company.image}`,
                err => {
                    if (err) console.log(err)
                }
            )
        company.image = filename
        return this.companyRepository.save(company)
    }

    async getImageName(userId: number, companyId: number): Promise<string> {
        const company = await this.companyRepository.findOne({
            relations: ['user'],
            where: {
                id: companyId,
                user: { id: userId },
            },
        })
        if (!company) {
            throw new HttpException('Company not found', 402)
        }
        return company.image
    }
}
