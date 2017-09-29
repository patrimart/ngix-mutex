
import { createSelector, MemoizedSelector } from "@ngrx/store";
import { MutexState, Mutex, AppWithMutexState } from "./models";
import { MUTEX_REDUCER_NAME } from "./reducer";


export const selectBase = (s: AppWithMutexState) => s[MUTEX_REDUCER_NAME];

export const selectMutex = (mutex: string | Mutex): MemoizedSelector<AppWithMutexState, Mutex> =>
    createSelector(selectBase, state => typeof mutex === "string" ? state[mutex] : state[mutex.id]);

export const selectMutexLock = (id: string | Mutex) =>
    createSelector(selectMutex(id), m => m.locked);

export const selectMutexCount = (id: string | Mutex) =>
    createSelector(selectMutex(id), m => m.count);

// export const selectMultiLock = (...selectors: MemoizedSelector<AppWithMutexState, boolean>[]) =>
//     createSelector(selectors[0], ...selectors);

// export const selectMultiCount = createSelector();

// export const selectWithComparator = (selector: MemoizedSelector<AppWithMutexState, number>, key: string) =>
//     createSelector(selector, m => m[key]);
