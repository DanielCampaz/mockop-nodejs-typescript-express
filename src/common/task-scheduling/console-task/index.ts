import {buildCronExpression, IntervalUnit, OptionType, type TaskSchedulerWorker} from "@core/task-scheduling";
import {GetLogger, type Logger} from "@core/logger";
import type {ScheduledTask} from "node-cron";

export class ConsoleTask implements TaskSchedulerWorker<any> {
  private logger: Logger
  private optionType = OptionType.INTERVAL
  private data: any = null
  constructor() {
    this.logger = GetLogger.getInstance().logger
  }

  async execute(_task: ScheduledTask): Promise<void> {
    this.logger.log(this.data)
  }

  getCronExpression(): string {
    const op= OptionType.INTERVAL
    this.optionType = op
    return buildCronExpression({
      type: this.optionType,
      every: 20,
      unit: IntervalUnit.SECONDS
    });
  }

  getType(): OptionType {
    return this.optionType;
  }

  setData(data: any): void {
    this.data = data
  }
}
