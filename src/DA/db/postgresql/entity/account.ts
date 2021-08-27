import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IAccount } from '../../../../types/types';

export class Account implements IAccount {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Account username', { unique: true })
  @Column()
  username: string;

  @Column()
  password: string;
}
