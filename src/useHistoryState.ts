import * as React from 'react';

export interface History<T> {
  histories: T[];
  pop: () => T | null;
  deleteItem: (value: T) => void;
}

type SetStateCallback<T> = (state: T) => T;
type SetState<T> = (nextState: T | SetStateCallback<T>) => void;

const DEFAULT_MAX_HEAP = 20;

export const useHistoryState = <T>(
  initialState?: T,
  maxHeap?: number,
): [T, SetState<T>, History<T>] => {
  const [state, setState] = React.useState<T>(initialState);
  const stateRef = React.useRef<T>(state);
  const historyRef = React.useRef<T[]>([]);

  const historyPop = React.useCallback(() => {
    const historyLength = historyRef.current.length;
    if (historyLength > 0) {
      const value = historyRef.current.pop();
      setState(value);
      return value;
    }
    return null;
  }, []);
  const historyDelete = React.useCallback((value: T) => {
    const deletedHistories = historyRef.current.filter(
      (item) => item !== value,
    );
    historyRef.current = deletedHistories;
    setState(deletedHistories[deletedHistories.length - 1]);
  }, []);
  const setStateCallback = React.useCallback(
    (nextValue) => {
      const value =
        typeof nextValue === 'function' ? nextValue(stateRef.current) : nextValue;

      historyRef.current = [...historyRef.current, stateRef.current];
      setState(value);
    },
    [],
  );

  React.useEffect(() => {
    if(typeof state !== 'undefined') {
      stateRef.current = state;
    }
  }, [state]);

  React.useEffect(() => {
    const historyLength = historyRef.current.length;
    const maxHeapSize = maxHeap ?? DEFAULT_MAX_HEAP;

    if (historyLength > maxHeapSize) {
      const excess = historyLength - maxHeapSize;
      historyRef.current.splice(0, excess);
    }
  }, [maxHeap, state]);
  
  return React.useMemo(() => ([
    state,
    setStateCallback,
    {
      histories: historyRef.current,
      pop: historyPop,
      deleteItem: historyDelete,
    },
  ]), [state]);
};
