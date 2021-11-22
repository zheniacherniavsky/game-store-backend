/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICategoryPostgres, IProductPostgres } from '../../../../types/types';
import { Product } from './product';

@Entity('category')
export class Category implements ICategoryPostgres {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Category displayName', { unique: true })
  @Column()
  displayName: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: IProductPostgres[];
}
