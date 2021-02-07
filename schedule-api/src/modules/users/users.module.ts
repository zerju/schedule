import { Module } from '@nestjs/common';
import { EntitiesModule } from '../../entities/entities.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [EntitiesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
