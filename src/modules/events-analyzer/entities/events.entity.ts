import { Exclude } from "class-transformer";
import { Product } from "src/modules/products/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Speaker } from "./speaker.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.events, { onDelete: 'CASCADE'})
  product: Product;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  eventName: string;

  @Column()
  eventAgenda: string;

  @Column()
  eventDescription: string;

  @Column({ type: 'timestamptz' })
  eventStartDateTime: Date;

  @Column({ type: 'timestamptz' })
  eventEndDateTime: Date;

  @Column()
  eventLocation: string;

  @Column()
  eventVenue: string;

  @Column()
  eventVenueCapacity: number;

  @Column({ type: 'jsonb', nullable: true })
  rsvpList: any[];

  @OneToMany(() => Speaker, (speaker) => speaker.event)
  speakers: Speaker[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @ManyToOne(() => User)
  createdBy: User;

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