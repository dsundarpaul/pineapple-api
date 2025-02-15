import { Injectable } from "@nestjs/common";
import { ValidatorConstraint } from "class-validator";
import { ProductRepository } from "../repository/product.repository";

@ValidatorConstraint({ name: "UniqueProductForThisUser", async: true })
@Injectable()
export class UniqueProductForThisUserRule {
  constructor(private _productRepository: ProductRepository) {}

  async validate(authorId: string, productName: string) {
    try {
      const product = await this._productRepository.findByAuthorIdAndProductName(authorId, productName);
      if (product) {
        return false;
      }
    } catch (err0r) {
      return false;
    }

    return true;
  }

  defaultMessage(authorId: string, productName: string) {
    return `Product with ${productName} already exists for user with id ${authorId}`;
  }
}