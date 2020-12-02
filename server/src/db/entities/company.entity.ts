import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm'

import UserEntity from './user.entity'

@Entity('company')
@Unique(['name'])
export default class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    image: string

    @Column({ length: 100 })
    address: string

    @Column({ length: 100 })
    serviceOfActivity: string

    @Column({ default: 0 })
    numberOfEmployees: number

    @Column({ default: '', length: 5000 })
    description: string

    @Column({ default: 'Private Company', length: 100 })
    type: string

    @ManyToOne(() => UserEntity, user => user.companies)
    user: UserEntity
}
