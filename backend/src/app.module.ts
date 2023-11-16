import { Module } from '@nestjs/common';
import { SetsModule } from './sets/sets.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SetsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'lift-log',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
