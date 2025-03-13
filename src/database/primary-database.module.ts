import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      autoLoadEntities: true,
      useFactory: () => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
        // namingStrategy: new SnakeNamingStrategy()
      }),
      inject: [ConfigService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export class PrimaryDatabaseModule {}