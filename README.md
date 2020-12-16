# useHistoryState

If the state is changed, record it.

## Install 
```bash
yarn add @odnh/use-history-state
# or 
npm install @odnh/use-history-state
```

## Use
```tsx
  useHistoryState<T>(initialState?: T, maxHeap?: number) => Result;
```

### parameters 
|Name|Type|description|
|-----|-------|--------------|
|initialState|`any`|-|
|maxHeap|`number`|Array size to be recorded|

---
### returns
|Name|Type|Description|
|-----|-------|--------------|
|Result|`Result`|default "use state" with `History`|


```tsx
interface History<T> {
  histories: T[],
  pop: () => void;
  deleteItem: (value: T) => void;
}
type Result<T> = [T, SetState<T>, History<T>];
```


## Example
```tsx
import React from 'react';
import {useHistoryState} from '@odnh/use-history-state';

const App = () => {
  const [state, setState, history] = useHistoryState<number>(0);
  
  const increment = React.useCallback(() => {
    setState(prev => prev+1);
  }, []);
  const decrement = React.useCallback(() => {
    setState(prev => prev-1);
  }, []);
  const revert = React.useCallback(() => {
    history.pop();
  }, []);

  return (
    <>
      <div>
        <button type="button" onClick={increment}>+ 1 </button>
        <p>{state}</p>
        <button type="button" onClick={decrement}>- 1 </button>
      </div>
      <button type="button" onClick={revert}>revert</button>
    </>
  )
}
```
