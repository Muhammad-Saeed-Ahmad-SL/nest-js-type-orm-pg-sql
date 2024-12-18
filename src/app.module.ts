import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { Book } from './book/entity/book.entity';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ContractModule } from './contract/contract.module';
import { Contract } from './contract/entity/contract.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '3h',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'typeorm-books-api',
      entities: [Book, User, Contract],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ContractModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: '/auth/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
