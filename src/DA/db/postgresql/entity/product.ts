/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../../../../types/types';
import { Category } from './category';

@Index(['price', 'totalRating', 'createdAt'])
@Entity('product')
export class Product implements IProduct {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Product displayName', { unique: true })
  @Column()
  displayName: string;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @Column()
  createdAt: Date;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}
