import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { Board } from './Board'

@Entity('Draw')
export class Draw {
  @PrimaryGeneratedColumn({ name: 'PK' })
  id!: number

  @ManyToOne(type => Board, board => board.id)
  boardId!: number
  
  @OneToOne(type => Draw, draw => draw.id, { nullable: true })
  parentId?: number

  @Column('datetime')
  createdAt!: Date
}
