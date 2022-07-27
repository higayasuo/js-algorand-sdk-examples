export type ErrorHandlerType = (error: unknown) => void;

export enum ChainType {
  MainNet = 'MainNet',
  TestNet = 'TestNet',
}

export type Unpromise<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U
  : never;

export type Unarray<T extends Array<unknown>> = T extends Array<infer U>
  ? U
  : never;
