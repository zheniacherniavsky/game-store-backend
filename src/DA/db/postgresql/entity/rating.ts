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

  @Index('Rating createdAt')
  @Column()
  createdAt: Date;

  @Column()
  rating: number;
}

@Entity('lastRating')
export class LastRating implements IRating {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id: string;

  @Index('LastRating user id')
  @Column()
  userId: string;

  @Index('LastRating product id')
  @Column()
  productId: string;

  @Index('LastRating createdAt')
  @Column()
  createdAt: Date;

  @Column()
  rating: number;
}
