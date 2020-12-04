import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn({ name: 'PK' })
    id!: number

  @Column("varchar")
    password!: string

  @Column("varchar")
    name?: string
}
