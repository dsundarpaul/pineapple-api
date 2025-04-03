import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./events.entity";

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  company: string;

  @Column()
  designation: string;

  @Column()
  bio: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  instagramUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @ManyToMany(() => Event, (event) => event.speakers)
  events: Event[];
} 