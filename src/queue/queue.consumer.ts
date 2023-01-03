import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE, QUEUE_STATUS } from 'src/constant/enum';

@Processor(QUEUE.TEST)
export class TestConsumer {
  @Process()
  async executeTest(job: Job<unknown>) {
    console.log('START', {
      timeStamp: job.processedOn,
      progress: job.progress(),
    });

    let progress = 0;

    this.doSomething(job.data);

    for (let i = 0; i < 100; i++) {
      progress += 1;
      await job.progress(progress);
      // console.log('Processing', job.progress());
    }

    console.log('END', {
      progress: job.progress(),
    });
  }

  doSomething(data: unknown) {
    console.log('SomeThing', data);
  }

  //Events
  @OnQueueActive()
  async onQueueActive(job: Job<unknown>) {
    console.log('onQueueActive', {
      timestamp: job.processedOn,
      isCompleted: await job.isActive(),
    });
  }

  @OnQueueCompleted()
  async onQueueComleted(job: Job<unknown>) {
    console.log('onQueueComleted', {
      timestamp: job.finishedOn,
      isCompleted: await job.isCompleted(),
    });
    // add the job again for loo
    job.queue.add(
      { status: QUEUE_STATUS.LOOP },
      {
        delay: 60000,
      },
    );
  }
}
