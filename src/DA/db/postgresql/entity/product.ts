import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../../../../types/types';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  displayName: string;

  @Column('int', { array: true })
  categoryIds: number[];

  @Column()
  createdAt: Date;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}
