import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueEmailRule } from "../constraints/UniqueEmailRule";

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "UniqueEmail",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueEmailRule
    })
  };
}