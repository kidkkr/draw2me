import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { Board } from './Board'

@Entity('Draw')
export class Draw {
  @PrimaryGeneratedColumn({ name: 'PK' })
  id!: number

  @ManyToOne(() => Board, board => board.id)
  boardId!: number
  
  @OneToOne(() => Draw, draw => draw.id, { nullable: true })
  parentId?: number

  @Column('datetime')
  createdAt!: Date
}
