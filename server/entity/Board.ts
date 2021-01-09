import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne(() => User, user => user.id)
  ownerId?: number

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'LOCALTIMESTAMP' })
  createdAt!: string;
}
