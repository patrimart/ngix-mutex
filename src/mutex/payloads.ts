
import { Action } from "@ngrx/store";
import { Mutex } from "./models";


export interface NewMutexPayload {
    readonly id: string;
    readonly locks: Action[];
    readonly unlocks: Action[];
}

export interface DeleteMutexPayload {
    readonly id: any;
}

export interface LockMutex {
    readonly id: string;
}

export interface UnlockMutexPayload {
    readonly id: string;
    readonly force: boolean;
}

export interface NewGuardPayload {
    readonly id: string;
    readonly mutexId: string;
    readonly selector: any;
    readonly effect: Action[];
    readonly reducer: any;
}

export interface DeleteGuardPayload {
    readonly id: any;
}
