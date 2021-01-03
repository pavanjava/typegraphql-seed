import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {User} from "../../../entities/User";

@ValidatorConstraint({async: true})
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
    validate(email: string): Promise<boolean> | boolean {
        return this.fetchUser(email);
    }

    async fetchUser(email: string) {
        const user = await User.findOne({where: {email}});
        return !user;
    }
}

export function IsEmailExist(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator(
            {
                target: object.constructor,
                propertyName: propertyName,
                options: validationOptions,
                constraints: [],
                validator: IsEmailExistConstraint
            }
        )
    }
}
