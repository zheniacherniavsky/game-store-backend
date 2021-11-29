import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct, IRating } from '../../../../types/types';
import { Product } from './product';

@Entity('lastRating')
export class LastRating implements IRating {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('lastRating userId')
  @Column()
  userId: string;

  @Column()
  rating: number;

  @Index('lastRating_CreatedAt')
  @Column()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.ratings, {
    onDelete: 'CASCADE',
  })
  product: IProduct;
}
