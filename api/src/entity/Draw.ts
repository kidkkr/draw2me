import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { Board } from './Board'
import { User } from './User'

@Entity()
export class Draw extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne(() => Board, board => board.id)
  boardId!: number

  @ManyToOne(() => User, user => user.id)
  userId!: number

  @Column('varchar')
  requestId!: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'LOCALTIMESTAMP' })
  createdAt!: string;
}
