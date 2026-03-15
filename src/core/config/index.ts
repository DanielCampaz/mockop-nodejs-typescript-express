export type Config<T extends Object> = {
  getPort(): number;
} & T
