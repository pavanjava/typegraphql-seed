import {Arg, Authorized, Query, Resolver} from "type-graphql";
import {User} from "../../entities/User";

@Resolver()
export class FinderResolver {
    @Authorized(["USER"])
    @Query(() => User, {nullable: true})
    async findById(@Arg("id") id: string): Promise<User | undefined> {
        return User.findOne({where: {"id": +id}});
    }

    @Query(() => [User], {nullable: true})
    async findAll(): Promise<User[]> {
        return await User.find();
    }
}
