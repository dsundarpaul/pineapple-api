import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Product } from 'src/modules/products/entities/product.entity';
// import { Account } from '../../account/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

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
    nullable: false,
    unique: true,
    length: 15,
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

  @Exclude()
  @Column({
    nullable: true,
    length: 150,
    type: 'varchar'
  })
  password: string;

  // @OneToOne(() => Account)
  // @JoinColumn()
  // account: Account;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isArchived?: boolean;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy?: User;

  @ManyToOne(() => User)
  @JoinColumn()
  updatedBy?: User;

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
