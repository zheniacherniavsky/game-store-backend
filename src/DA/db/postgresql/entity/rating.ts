import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IRating } from '../../../../types/types';

@Entity('rating')
export class Rating implements IRating {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('Rating user id')
  @Column()
  userId: string;

  @Index('Rating product id')
  @Column()
  productId: string;

  @Column()
  rating: number;
}
