import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QUEUE } from 'src/constant/enum';
import { TestConsumer } from './queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE.TEST,
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, TestConsumer],
})
export class QueueModule {}
