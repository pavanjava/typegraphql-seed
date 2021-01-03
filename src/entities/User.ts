import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType, Root} from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("varchar",{name:"first_name"})
    firstName: string;

    @Field()
    @Column("varchar",{name:"last_name"})
    lastName: string;

    @Field()
    @Column("varchar",{name:"email", unique: true})
    email: string;

    @Column("varchar",{name:"password"})
    password: string

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

}
