/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICategory } from '../../../../types/types';
import { Product } from './product';

@Entity('category')
export class Category implements ICategory {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Category displayName', { unique: true })
  @Column()
  displayName: string;

  @ManyToMany((type) => Product, (product) => product.categories)
  products: Product[];
}
