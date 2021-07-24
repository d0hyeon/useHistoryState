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
  useHistoryState<T>(initialState?: T, size?: number) => Result;
```

### parameters 
|Name|Type|description|
|-----|-------|--------------|
|initialState|`any`|-|
|size|`number`|Stack size to record|

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
  clearItems: () => void;
}
type Result<T> = [T, SetState<T>, History<T>];
```


## Example

[live demo](https://codesandbox.io/s/usehistorystate-crsz1?file=/src/App.tsx)

```tsx
import React from 'react';
import useHistoryState from '@odnh/use-history-state';

const App = () => {
  const [state, setState, history] = useHistoryState<number>(0);
  
  const increment = React.useCallback(() => {
    setState(prev => prev+1);
  }, [setState]);
  const decrement = React.useCallback(() => {
    setState(prev => prev-1);
  }, [setState]);
  const revert = React.useCallback(() => {
    history.pop();
  }, [history]);
  const clear = REact.useCallback(() => {
    history.clearItems();
  }, [history]);

  return (
    <>
      <div>
        <button type="button" onClick={increment}>+ 1 </button>
        <p>{state}</p>
        <button type="button" onClick={decrement}>- 1 </button>
      </div>
      <button type="button" onClick={revert}>revert</button>
      <button type="button" onClick={clear}>clear</button>
      <p>histories</p>
      <ul>
        {history.histories.map(value => (
          <li key={value}>
            {value}
          </li>
        ))}
      </ul>
    </>
  )
}
```
