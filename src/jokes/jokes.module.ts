import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';

@Module({
  controllers: [JokesController]
})
export class JokesModule {}
