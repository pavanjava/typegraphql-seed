import {Arg, Query, Resolver} from "type-graphql";
import {User} from "../../entities/User";
import {compare} from "bcryptjs";

@Resolver()
export class LoginResolver {

    @Query(() => User, {nullable: true})
    async login(@Arg("email") email: string, @Arg("password") password: string): Promise<User | undefined> {
        const selectedUser = await User.findOne({where:{email}});

        if(!selectedUser){
            return undefined;
        }

        const isPasswordSame = await compare(password, selectedUser.password);
        if(!isPasswordSame){
            return undefined;
        }
        return selectedUser;
    }
}
