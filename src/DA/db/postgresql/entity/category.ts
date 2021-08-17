/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../../../../types/types';
import { Product } from './product';

@Entity("category")
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  displayName: string;

  @ManyToMany(type => Product, product => product.categories)
  products: Product[];
}
