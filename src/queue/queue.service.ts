import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE, QUEUE_STATUS } from 'src/constant/enum';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(QUEUE.TEST) private testQueue: Queue) {}
  async addJob() {
    await this.testQueue.add({ status: QUEUE_STATUS.INITIALIZE });
    console.log('job is added');
  }
}
