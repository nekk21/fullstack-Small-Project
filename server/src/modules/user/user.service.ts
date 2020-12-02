import { Injectable } from '@nestjs/common'
import UserEntity from '../../db/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import { UserData, UserAD } from './user.interface'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { HttpStatus } from '@nestjs/common'
import { validate } from 'class-validator'
import * as argon2 from 'argon2'
import fs = require('fs')

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return null
    }

    async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ email })
        if (!user) {
            return null
        }

        if (await argon2.verify(user.password, password)) {
            return user
        }

        return null
    }

    async create(dto: CreateUserDto, roles: string): Promise<UserEntity> {
        // check uniqueness of username/email
        const { username, email, password } = dto
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email })

        const user = await qb.getOne()

        if (user) {
            const errors = { username: 'Username and email must be unique.' }
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        // create new user
        let newUser = new UserEntity()
        newUser.username = username
        newUser.email = email
        newUser.password = password
        if (roles) newUser.roles = roles

        const errors = await validate(newUser)
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        } else {
            const savedUser = await this.userRepository.save(newUser)
            return savedUser
        }
    }

    async update(id: number, data): Promise<UserEntity> {
        const dto: UpdateUserDto = data
        const user = await this.userRepository.findOne(id)

        if (!user) {
            const errors = { user: 'cannot find user :(' }
            throw new HttpException(
                { message: 'Cant find user with this field...(', errors },
                HttpStatus.BAD_REQUEST
            )
        }
        if (dto.phoneNumber) {
            user.phoneNumber = dto.phoneNumber
        }
        if (dto.username) {
            user.username = dto.username
        }
        if (dto.description) {
            user.description = dto.description
        }
        if (dto.password) {
            user.password = await argon2.hash(dto.password)
        }
        if (dto.firstName) {
            user.firstName = dto.firstName
        }
        if (dto.lastName) {
            user.lastName = dto.lastName
        }
        if (dto.position) {
            user.position = dto.position
        }

        const errors = await validate(user)
        if (errors.length > 0) {
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        return await this.userRepository.save(user)
    }

    async deleteByEmail(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ email: email })
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete({ id: id })
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)

        if (!user) {
            const errors = { User: ' not found' }
            throw new HttpException({ errors }, 402)
        }

        return user
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        })
        if (!user) {
            const errors = { User: ' not found' }
            throw new HttpException({ errors }, 402)
        }

        return user
    }

    async addRole(id: number, role: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        const roles = user.roles.split(',')
        roles.push(role)
        user.roles = roles.join(',')
        return this.userRepository.save(user)
    }

    async removeRole(id: number, role: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        if (user.roles.search(role) === -1) return user
        if (!user.roles.search(role)) {
            user.roles = user.roles.replace(role, '')
        } else {
            user.roles = user.roles.replace(',' + role, '')
        }
        return this.userRepository.save(user)
    }

    async updateImage(id: number, filename: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        if (!user) {
            await fs.unlink(
                `${__dirname}/../../../../files/avatar/${filename}`,
                err => {
                    if (err) console.log(err)
                }
            )
            throw new HttpException('Cannot find user with provided id', 402)
        }
        if (user.image)
            await fs.unlink(
                `${__dirname}/../../../../files/avatar/${user.image}`,
                err => {
                    if (err) console.log(err)
                }
            )
        user.image = filename
        return this.userRepository.save(user)
    }

    async getImageName(userId: number): Promise<string> {
        const user = await this.userRepository.findOne(userId)
        if (!user) {
            throw new HttpException('User not found', 402)
        }
        return user.image
    }
}
