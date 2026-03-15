export interface Application<T = any> {
  import(controller: T): Promise<void>;
  start(): Promise<void>;
}
