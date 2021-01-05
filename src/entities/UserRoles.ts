import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users_role")
export class UserRoles extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", {name: "user_id"})
    userId: number;

    @Column("varchar", {name: "role"})
    role: string;

}
