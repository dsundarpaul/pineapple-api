import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import { Event } from '@/modules/events-analyzer/entities/events.entity';
import { UserProduct } from './user-product.entity';
// import { Plan } from '../../plan/entities/plan.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToMany(() => UserProduct, userProduct => userProduct.product)
  userProducts: UserProduct[];

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar'
  })
  productName: string;

  @Column({
    nullable: true,
    length: 255,
    type: 'varchar'
  })
  logo: string;

  @Column({
    nullable: true,
    length: 255,
    type: 'varchar'
  })
  productDocLink: string;

  @Column({
    nullable: true,
    length: 255,
    type: 'varchar'
  })
  githubRepoLink: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar'
  })
  domain: string;

  // @ManyToOne(() => Plan)
  // @JoinColumn()
  // plan: Plan;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;
  
  @Exclude()
  @Column({ type: 'boolean', default: false })
  isArchived?: boolean;

  @OneToMany(() => Event, (event) => event.product)
  @JoinColumn()
  events?: Event[];

  // @ManyToOne(() => User)
  // @JoinColumn()
  // createdBy?: User;

  // @ManyToOne(() => User)
  // @JoinColumn()
  // updatedBy?: User;

  // @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt?: Date;

  // @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  // updatedAt?: Date;

  // @Exclude()
  // @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  // deletedAt?: Date;

  @Exclude()
  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment?: string | null;
}
