import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento!: Date;

  @Column({ default: false })
  deletado!: boolean;
}
