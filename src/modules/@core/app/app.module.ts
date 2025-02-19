import { Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventAnalyzerModule } from 'src/modules/events-analyzer/events-analzer.module';
import { UserModule } from 'src/modules/user/user.module';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { FormsModule } from 'src/modules/forms/forms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrimaryDatabaseModule } from 'src/database/primary-database.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { AuthModule } from '../auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from '@/modules/scheduled-tasks/scheduled-tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TaskModule,
    PrimaryDatabaseModule,
    AuthModule,
    EventAnalyzerModule,
    ProductsModule,
    UserModule, 
    FormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log("AppModule");
    console.log(process.env.DB_HOST);
  }
}
