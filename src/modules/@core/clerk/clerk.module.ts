import { Module } from "@nestjs/common";
import { ClerkController } from "./clerk.controller";
import { ClerkService } from "./clerk.service";
import { UserService } from "@/modules/user/user.service";
import { UserModule } from "@/modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ClerkController],
  providers: [ClerkService]
})
export class ClerkModule {}