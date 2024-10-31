export type WithLoadedState = {
  isLoaded: boolean;
};

export type WithAbortSignal<T = unknown> = {
  signal: AbortSignal;
} & T;
