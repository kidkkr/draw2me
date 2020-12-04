import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Draw } from './Draw'

@Entity('DrawEvent')
export class DrawEvent {
  @PrimaryGeneratedColumn({ name: 'PK' })
  id!: number

  @ManyToOne(type => Draw, draw => draw.id)
  drawId!: number

  @Column('varchar')
  requestId!: string

  @Column('datetime')
  createdAt!: Date
}
