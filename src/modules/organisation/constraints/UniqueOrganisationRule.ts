import { Injectable } from "@nestjs/common";
import { ValidatorConstraint } from "class-validator";
import { OrganisationRepository } from "../repository/organisation.repository";

@ValidatorConstraint({ name: "UniqueOrganisation", async: true })
@Injectable()
export class UniqueOrganisationRule {
  constructor(private _organisationRepository: OrganisationRepository) {}

  async validate(authorId: string, organisationName: string) {
    try {
      const organisation = await this._organisationRepository.findByAuthorIdAndOrganisationName(authorId, organisationName);
      if (organisation) {
        return false;
      }
    } catch (err0r) {
      return false;
    }

    return true;
  }

  defaultMessage(authorId: string, organisationName: string) {
    return `Organisation with ${organisationName} already exists for user with id ${authorId}`;
  }
}