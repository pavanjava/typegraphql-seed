import {AuthChecker} from "type-graphql";
import {UserRoles} from "../../entities/UserRoles";

interface ArgsDict {
    args: any;
}

export const APIAuthChecker: AuthChecker<any> = async ({args}: ArgsDict, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log(args, roles);
    const userRoles: UserRoles | undefined = await UserRoles.findOne({where: {userId: +args.id}});
    console.log(userRoles);
    // compare the roles and the return the decesion
    return true;

}
