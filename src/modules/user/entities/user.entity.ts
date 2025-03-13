import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Product } from '@/modules/products/entities/product.entity';
import { UserProduct } from '@/modules/products/entities/user-product.entity';
// import { Product } from 'src/modules/products/entities/product.entity';
// import { Account } from '../../account/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // @PrimaryColumn
  @Column({
    nullable: false,
    type: 'varchar',
  })
  userId: string;

  @Column({
    nullable: false,
    length: 100,
    type: 'varchar'
  })
  name: string;

  @Column({
    nullable: false,
    length: 20,
    type: 'varchar'
  })
  type: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar'
  })
  avatar: string;

  @Column({
    nullable: true,
    unique: true,
    length: 35,
    type: 'varchar'
  })
  phone: string;

  @Column({
    nullable: false,
    unique: true,
    length: 50,
    type: 'varchar'
  })
  email: string;

  @OneToMany(() => UserProduct, userProduct => userProduct.product)
  userProducts: UserProduct[];

  // @Exclude()
  // @Column({
  //   nullable: true,
  //   length: 150,
  //   type: 'varchar'
  // })
  // password: string;

  // @OneToOne(() => Account)
  // @JoinColumn()
  // account: Account;

  // @OneToMany(() => Product, (product) => product.authorId)
  // products: Product[];

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isArchived?: boolean;

  // @ManyToOne(() => User)
  // @JoinColumn()
  // createdBy?: User;

  // @ManyToOne(() => User)
  // @JoinColumn()
  // updatedBy?: User;

  @Column({ type: 'varchar', length: 255, nullable: true })
  blockedFrom?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @Exclude()
  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment?: string | null;
}
