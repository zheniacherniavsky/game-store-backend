/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICategoryPostgres, IProductPostgres, IRating } from '../../../../types/types';
import { Category } from './category';
import { Rating } from './rating';

@Index(['price', 'totalRating', 'createdAt'])
@Entity('product')
export class Product implements IProductPostgres {
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
  categories: ICategoryPostgres[];

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: IRating[];

  @Column()
  createdAt: Date;

  @Column({ default: 0 })
  totalRating: number;

  @Column()
  price: number;
}
