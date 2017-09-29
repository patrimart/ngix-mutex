
import { Action } from "@ngrx/store";

import { MUTEX_REDUCER_NAME } from "./reducer";
import { genId } from "mutex/utils";


export interface MutexState {
    [id: string]: Mutex;
};

export interface AppWithMutexState {
    [id: string]: any;
    "[@ngix/mutes]": MutexState;
}


export class Mutex {
    constructor (
        public readonly locked = false,
        public readonly count = 0,
        public readonly id = genId(),
    ) {}
}


export class Guard {
    constructor (
        public readonly selector: any,
        public readonly effect: Action[],
        public readonly reducer = (state: any) => state,
        public readonly id = genId(),
    ) {}
}
