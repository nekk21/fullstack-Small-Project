import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
    Unique,
    JoinColumn,
} from 'typeorm'

import { IsEmail } from 'class-validator'
import * as argon2 from 'argon2'
import CompanyEntity from './company.entity'

@Entity('user')
@Unique(['username', 'email', 'phoneNumber'])
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, default: '' })
    username: string

    @Column({ default: '' })
    roles: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({ default: '', length: 100 })
    firstName: string

    @Column({ default: '', length: 100 })
    lastName: string

    @Column({ default: '', length: 2000 })
    description: string

    @Column({ default: '', length: 100 })
    position: string

    @Column({ default: '' })
    image: string

    @Column({ default: '', length: 100 })
    phoneNumber: string

    @OneToMany(() => CompanyEntity, company => company.user, {
        cascade: ['insert', 'update', 'remove'],
    })
    @JoinColumn()
    companies: CompanyEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }
}
