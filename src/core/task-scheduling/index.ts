import cron, {type ScheduledTask} from "node-cron";

export enum IntervalUnit {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
}

export enum DailyRepeat {
  EVERY = 'every',
  WEEKDAYS = 'weekdays',
  WEEKENDS = 'weekends'
}

export enum OptionType {
  INTERVAL = 'interval',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  EXACT = 'exact',
  CUSTOM = 'custom'
}

export interface IntervalOptions {
  type: OptionType.INTERVAL;
  every: number;
  unit: IntervalUnit;
}

export interface DailyOptions {
  type: OptionType.DAILY;
  hour: number;
  minute: number;
  repeat?: DailyRepeat;
}

export interface WeeklyOptions {
  type: OptionType.WEEKLY;
  hour: number;
  minute: number;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo
}

export interface ExactDateOptions {
  type: OptionType.EXACT;
  date: Date;
}

export interface CustomOptions {
  type: OptionType.CUSTOM;
  second?: string;
  minute?: string;
  hour?: string;
  dayOfMonth?: string;
  month?: string;
  dayOfWeek?: string;
}

export type CronOptions =
  | IntervalOptions
  | DailyOptions
  | WeeklyOptions
  | ExactDateOptions
  | CustomOptions;

export function buildCronExpression(options: CronOptions): string {
  switch (options.type) {

    case OptionType.INTERVAL: {
      const { every, unit } = options;
      if (unit === 'seconds') return `*/${every} * * * * *`;
      if (unit === 'minutes') return `0 */${every} * * * *`;
      if (unit === 'hours')   return `0 0 */${every} * * *`;
      throw new Error(`Unidad no válida: ${unit}`);
    }

    case OptionType.DAILY: {
      const { hour, minute, repeat = 'every' } = options;
      const dow =
        repeat === 'weekdays' ? '1-5' :
          repeat === 'weekends' ? '0,6' : '*';
      return `0 ${minute} ${hour} * * ${dow}`;
    }

    case OptionType.WEEKLY: {
      const { hour, minute, dayOfWeek } = options;
      return `0 ${minute} ${hour} * * ${dayOfWeek}`;
    }

    case OptionType.EXACT: {
      const d = options.date;
      const sec  = d.getSeconds();
      const min  = d.getMinutes();
      const hour = d.getHours();
      const dom  = d.getDate();
      const mon  = d.getMonth() + 1;
      return `${sec} ${min} ${hour} ${dom} ${mon} *`;
    }

    case OptionType.CUSTOM: {
      const {
        second     = '*',
        minute     = '*',
        hour       = '*',
        dayOfMonth = '*',
        month      = '*',
        dayOfWeek  = '*',
      } = options;
      return `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    }
  }
}

// Ejemplos
// Cada 30 segundos
// buildCronExpression({ type: 'interval', every: 30, unit: 'seconds' });
//  → '*/30 * * * * *'

// Todos los días a las 08:30
// buildCronExpression({ type: 'daily', hour: 8, minute: 30 });
//  → '0 30 8 * * *'

// Solo lunes a viernes a las 09:00
// buildCronExpression({ type: 'daily', hour: 9, minute: 0, repeat: 'weekdays' });
//  → '0 0 9 * * 1-5'

// Cada martes a las 15:00
// buildCronExpression({ type: 'weekly', hour: 15, minute: 0, dayOfWeek: 2 });
//  → '0 0 15 * * 2'

// Fecha exacta
// buildCronExpression({ type: 'exact', date: new Date('2026-12-25T10:00:00') });
//  → '0 0 10 25 12 *'

// Custom
// buildCronExpression({ type: 'custom', minute: '*/15', hour: '9-17' });
//  → '* */15 9-17 * * *'

export interface TaskSchedulerWorker<T = any> {
  getType(): OptionType
  setData(data: T): void;
  execute(task: ScheduledTask): Promise<void>;
  getCronExpression(): string;
}

export class TaskScheduler {
  private static taskScheduler: TaskScheduler | null = null;
  private workersDefault: Map<string, TaskSchedulerWorker> = new Map<string, TaskSchedulerWorker>();
  private constructor() {

  }

  addWorker<T extends TaskSchedulerWorker>(worker: T) {
    if(worker === undefined) return
    const scheduledTask = cron.schedule(worker.getCronExpression(), async () => {
      await worker.execute(scheduledTask)
      if(worker.getType() === OptionType.EXACT){
        scheduledTask.stop()
        await scheduledTask.destroy()
      }
    })
  }

  initDefaultTasks() {
    this.workersDefault.keys().forEach(task => {
      const worker = this.workersDefault.get(task);
      if(worker === undefined) return
      const scheduledTask = cron.schedule(worker.getCronExpression(), async () => {
        await worker.execute(scheduledTask)
      })
    })
  }

  static getInstance() {
    if (TaskScheduler.taskScheduler === null) {
      TaskScheduler.taskScheduler = new TaskScheduler();
    }
    return TaskScheduler.taskScheduler;
  }
}
