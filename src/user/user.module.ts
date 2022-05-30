import { Module } from '@nestjs/common';
import { UserController } from './infraestructure/user.controller';
import { UserService } from './domain/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
  
}
