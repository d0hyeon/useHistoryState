type SetStateCallback<T> = (state: T) => T;

export interface History<T> {
  histories: T[];
  pop: () => T | null;
  clearItems: () => void;
  deleteItem: (value: T) => void;
}

export type InitialStateCallback<T> = () => T;
export type SetState<T> = (nextState: T | SetStateCallback<T>) => void;
export type UseHistoryState<T = unknown> = (initialState?: T | InitialStateCallback<T>, size?: number) => [T, SetState<T>, History<T>];