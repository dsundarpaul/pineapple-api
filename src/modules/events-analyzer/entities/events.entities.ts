import { Exclude } from "class-transformer";
import { Product } from "src/modules/products/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({
    nullable: false,
    unique: true,
    length: 255,
    type: 'varchar',
  })
  eventName: string;

  @Column()
  eventDescription: string;

  @Column()
  eventLocation: string;

  @Column()
  eventVenue: string;

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