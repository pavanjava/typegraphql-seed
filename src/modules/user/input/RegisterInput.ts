import {Field, InputType} from "type-graphql";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {IsEmailExist} from "../validators/EmailConstraints";

@InputType()
export class RegisterInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailExist({message: "user with email already exist !"})
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}
