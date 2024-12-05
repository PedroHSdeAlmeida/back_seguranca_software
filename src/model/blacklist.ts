import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Blacklist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuario_id!: number;
}
