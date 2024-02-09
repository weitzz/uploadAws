import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    imageURL: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.posts) 
    @JoinColumn({ name: "userId" }) 
    user: User;

}
