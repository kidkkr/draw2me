import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar')
  password!: string

  @Column('varchar')
  name?: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'LOCALTIMESTAMP' })
  createdAt!: string;
}
