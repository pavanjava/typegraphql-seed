import {Arg, FieldResolver, Mutation, Resolver, Root} from "type-graphql";
import {hash} from "bcryptjs";
import {User} from "../../entities/User";

@Resolver(User)
export class RegisterResolver {

    @FieldResolver()
    async name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Mutation(() => User)
    async register(@Arg("firstName") firstName: string,
                   @Arg("lastName") lastName: string,
                   @Arg("email") email: string,
                   @Arg("password") password: string): Promise<User> {

        password = await hash(password, 10);
        const user = User.create({firstName, lastName, email, password});

        return await user.save();

    }
}
