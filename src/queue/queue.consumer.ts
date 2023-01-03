import { Process, Processor } from '@nestjs/bull';
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
      attemptsMade: job.timestamp,
      progress: job.progress(),
    });
    //restart the queue
    job.queue.add(
      { status: QUEUE_STATUS.LOOP },
      {
        delay: 60000,
      },
    );
  }

  doSomething(data: unknown) {
    console.log('SomeThing', data);
  }
}
