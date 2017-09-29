
import { Action } from "@ngrx/store";

import * as payloads from "./payloads";
import { Guard, Mutex } from "mutex/models";
import { genId } from "mutex/utils";


export const NEW_MUTEX = "[@ngix/mutex] New Mutex";
export const DELETE_MUTEX = "[@ngix/mutex] Delete Mutex";
export const LOCK_MUTEX = "[@ngix/mutex] Lock Mutex";
export const UNLOCK_MUTEX = "[@ngix/mutex] Unlock Mutex";

export const NEW_GUARD = "[@ngix/mutex] Unlock Mutex";
export const DELETE_GUARD = "[@ngix/mutex] Delete Mutex";


export class NewMutex implements Action {
    public readonly type = NEW_MUTEX;
    public readonly payload: payloads.NewMutexPayload;
    constructor (
        locks: Action[],
        unlocks: Action[],
        id = genId(),
    ) {
        this.payload = { id, locks, unlocks };
    }
}

export class DeleteMutex implements Action {
    public readonly type = DELETE_MUTEX;
    public readonly payload: payloads.DeleteMutexPayload;
    constructor (mutex: string | Mutex) {
        this.payload = { id: typeof mutex === "string" ? mutex : mutex.id };
    }
}

export class LockMutex implements Action {
    public readonly type = LOCK_MUTEX;
    public readonly payload: payloads.LockMutex;
    constructor (mutex: string | Mutex) {
        this.payload = { id: typeof mutex === "string" ? mutex : mutex.id };
    }
}

export class UnlockMutex implements Action {
    public readonly type = UNLOCK_MUTEX;
    public readonly payload: payloads.UnlockMutexPayload;
    constructor (
        mutex: string | Mutex,
        force = false,
    ) {
        this.payload = { force, id: typeof mutex === "string" ? mutex : mutex.id };
    }
}

export class NewGuard implements Action {
    public readonly type = NEW_GUARD;
    public readonly payload: payloads.NewGuardPayload;
    constructor (
        mutexId: string,
        selector: any,
        effect: Action[],
        reducer: any,
        id = genId(),
    ) {
        this.payload = { id, mutexId, selector, effect, reducer };
    }
}

export class DeleteGuard implements Action {
    public readonly type = DELETE_GUARD;
    public readonly payload: payloads.DeleteGuardPayload;
    constructor (guard: string | Guard) {
        this.payload = { id: typeof guard === "string" ? guard : guard.id };
    }
}


export type Type
    = NewMutex
    | DeleteMutex
    | LockMutex
    | UnlockMutex
    | NewGuard
    | DeleteGuard;
