import scheduler from 'node-schedule';

export abstract class CronJob {
  constructor(public readonly cronPattern: string) {}

  public setupJob() {
    scheduler.scheduleJob(this.cronPattern, this.handle.bind(this));
  }

  protected abstract handle(): Promise<void> | void;
}
