import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueProductForThisUserRule } from "../constraints/UniqueProductForThisUserRule";

export function UniqueProductForThisUser(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "UniqueProductForThisUser",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueProductForThisUserRule
    })
  };
}