import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IAccount } from '../../../../types/types';

@Entity('account')
export class Account implements IAccount {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Account username', { unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: string;
}
