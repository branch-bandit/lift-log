import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { SetsRepository } from './sets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SetsRepository])],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
