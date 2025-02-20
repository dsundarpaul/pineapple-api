import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueOrganisationRule } from "../constraints/UniqueOrganisationRule";

export function UniqueOrganisationName (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "UniqueOrganisationNameForThisUser",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueOrganisationRule
    })
  };
}