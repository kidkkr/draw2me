import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { User } from './User'
import { Draw } from './Draw'

@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn({ name: 'PK' })
  id!: number

  @ManyToOne(type => User, user => user.id)
  ownerId?: number

  @OneToOne(type => Draw, draw => draw.id)
  currentDrawId?: number

  @Column('datetime')
  createAt!: Date
}
