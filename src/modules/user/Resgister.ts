import {Arg, Mutation, Resolver} from "type-graphql";
import {hash} from "bcryptjs";
import {User} from "../../entities/User";
import {RegisterInput} from "./input/RegisterInput";

@Resolver(User)
export class RegisterResolver {

    @Mutation(() => User)
    async register(@Arg("data") input: RegisterInput): Promise<User> {

        input.password = await hash(input.password, 10);
        const user = User.create(input);

        return await user.save();

    }
}
