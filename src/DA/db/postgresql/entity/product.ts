/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IProduct, IRating } from '../../../../types/types';
import { Category } from './category';
import { Rating } from './rating';

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
  @RelationId((product: Product) => product.categories)
  categoriesIds: string[] = [];

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: IRating[];

  @Column()
  createdAt: Date;

  @Column({ default: 0 })
  totalRating: number;

  @Column()
  price: number;
}
