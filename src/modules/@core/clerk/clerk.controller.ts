import { Controller, Headers, HttpException, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ClerkService } from "./clerk.service";

@Controller('webhooks')
export class ClerkController {
  constructor(private readonly clerkService: ClerkService) {}

  @Post('clerk')
  async handleClerkWebhook(
    @Req() req: Request,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    try {
      const payload = req.body;
      
      // Verify the webhook signature
      const isValid = await this.clerkService.verifyClerkWebhook(
        payload,
        svixId,
        svixTimestamp,
        svixSignature,
      );
      
      if (!isValid) {
        throw new HttpException('Invalid webhook signature', HttpStatus.UNAUTHORIZED);
      }
      
      // Process the webhook event
      return this.clerkService.processClerkWebhook(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}