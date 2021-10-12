import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct, IRating } from '../../../../types/types';
import { Product } from './product';

@Entity('rating')
export class Rating implements IRating {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Rating userId', { unique: true })
  @Column()
  userId: string;

  @Column()
  rating: number;

  @ManyToOne(() => Product, (product) => product.ratings)
  product: IProduct;
}
