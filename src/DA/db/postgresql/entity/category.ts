import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../../../../types/types';

@Entity("category")
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  displayName: string;
}
