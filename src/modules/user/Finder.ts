import {Arg, Query, Resolver} from "type-graphql";
import {User} from "../../entities/User";

@Resolver()
export class FinderResolver {
    @Query(() => User, {nullable: true})
    async findById(@Arg("id") id: string): Promise<User | undefined> {
        return User.findOne({where: {"id": +id}});
    }

    @Query(() => [User], {nullable: true})
    async findAll(): Promise<User[]> {
        const users = await User.find();
        return users;
    }
}
