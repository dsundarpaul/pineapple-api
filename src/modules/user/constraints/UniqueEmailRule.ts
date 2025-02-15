import { Injectable } from "@nestjs/common";
import { ValidatorConstraint } from "class-validator";
import { UserRepository } from "../repository/user.repository";

@ValidatorConstraint({ name: "UniqueEmail", async: true })
@Injectable()
export class UniqueEmailRule {
  constructor(private _userRepository: UserRepository) {}

  async validate(email: string) {
    try {
      const user = await this._userRepository.findByEmail(email);
      if (user) {
        return false;
      }
    } catch (error) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "Email already exists";
  }
}