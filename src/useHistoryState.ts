import * as React from 'react';
import { History, InitialStateCallback, SetState } from './type';

const DEFAULT_MAX_HEAP = 20;

function useHistoryState <T> (
  initialState?: T | InitialStateCallback<T>,
  size?: number,
): [T, SetState<T>, History<T>] {
  const [state, setState] = React.useState<T>(initialState);
  const [_, forceUpdate] = React.useState(0);
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
  }, [historyRef, setState]);

  const historyClear = React.useCallback(() => {
    historyRef.current = [];
    forceUpdate(prev => prev+1);
  }, [historyRef, forceUpdate]);

  const setStateCallback = React.useCallback(
    (nextValue) => {
      const value =
        typeof nextValue === 'function' ? nextValue(stateRef.current) : nextValue;

      if(typeof stateRef.current !== 'undefined') {
        historyRef.current.push(stateRef.current);
      }
      setState(value);
    },
    [historyRef, setState],
  );

  React.useEffect(() => {
    if(typeof state !== 'undefined') {
      stateRef.current = state;
    }
  }, [state]);

  React.useEffect(() => {
    const historyLength = historyRef.current.length;
    const maxSize = size ?? DEFAULT_MAX_HEAP;

    if (historyLength > maxSize) {
      const excess = historyLength - maxSize;
      historyRef.current.splice(0, excess);
    }
  }, [size, state]);
  
  return [
    state,
    setStateCallback,
    {
      histories: historyRef.current,
      pop: historyPop,
      deleteItem: historyDelete,
      clearItems: historyClear
    },
  ]
};

export default useHistoryState;