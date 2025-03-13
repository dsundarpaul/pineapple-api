import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { UserService } from "@/modules/user/user.service";
import { Injectable, Logger } from "@nestjs/common";
import { Webhook } from "svix";

@Injectable()
export class ClerkService {
  constructor(private readonly _userService: UserService) {}

  private readonly logger = new Logger(ClerkService.name)

  async verifyClerkWebhook(payload: any, svixId: string, svixTimestamp: string, svixSignature: string): Promise<boolean> {
    try {
      const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable');
      }

      // console.log("***", payload)
      // console.log("***", svixId)
      // console.log("***", svixTimestamp)

      const payloadString = typeof payload === "string" ? payload : JSON.stringify(payload);

      const wh = new Webhook(webhookSecret);
      const evt = wh.verify(payloadString, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });

      return true;
    } catch (error) {
      console.error('Webhook verification failed:', error);
      return false;
    }
  }

  async processClerkWebhook(payload: any) {
    const { type, data } = payload;
    
    switch (type) {
      case 'user.created':
        return this.handleUserCreated(data);
      case 'user.updated':
        return this.handleUserUpdated(data);
      case 'user.deleted':
        return this.handleUserDeleted(data);
      // Add more event types as needed
      default:
        console.log(`Unhandled webhook event type: ${type}`);
        return { received: true };
    }
  }

  private async handleUserCreated(data: any) {
    
    this.logger.log({ module: 'clerk', class: 'ClerkService', method: 'hanldeUserCreated', info: 'hading create user, triggered by clerk webhook',
      data: data,
    })

    if(!data || !data.id) {
      this.logger.error({ module: 'clerk', class: 'ClerkService', method: 'hanldeUserCreated', info: 'Invalid data received from clerk webhook',
        data: data,
      })
      return { processed: false }
    }

    const userEmailId = data?.email_addresses.find((i: any) => i.object === 'email_address')?.email_address

    const userCreatePayload: CreateUserDto = {
      userEmail: userEmailId,
      username: data?.first_name + " " + data?.last_name,
      id: data?.id,
      userId: data.id,
      product: null
    }

    this.logger.log({ module: 'clerk', class: 'ClerkService', method: 'hanldeUserCreated', info: 'New User create from clerk webhook',
      data: userCreatePayload,
    })

    const newUser = this._userService.createUser(userCreatePayload)

    if(!newUser) { return { processed: false }}
    
    this.logger.log({
      module: 'clerk',
      class: 'ClerkService',
      method: 'hanldeUserCreated',
      info: 'New User create from clerk webhook',
      data: newUser
    })
    
    return { processed: true };
  }

  private async handleUserUpdated(data: any) {
    // Implement user update logic
    console.log('User updated:', data.id);
    return { processed: true };
  }

  private async handleUserDeleted(data: any) {
    // Implement user deletion logic
    console.log('User deleted:', data.id);
    return { processed: true };
  }
}