/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../../../../types/types';
import { Category } from './category';

@Entity("product")
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  displayName: string;

  @ManyToMany(type => Category, category => category.products, {
    cascade: true
  })
  @JoinTable()
  categories: Category[]

  @Column()
  createdAt: Date;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}
