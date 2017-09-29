
import { ActionReducerMap } from "@ngrx/store";

import { Guard, Mutex, MutexState } from "mutex/models";
import * as actions from "./actions";
import * as payloads from "./payloads";


export const MUTEX_REDUCER_NAME = "[@ngix/mutes]";

export const REDUCERS: ActionReducerMap<string, Action> = {
    "[@ngix/mutes]": mutexReducer
};

export const INIT_STATE: { "[@ngix/mutes]": MutexState } = {
    "[@ngix/mutes]": {},
};


export type Action = actions.Type;

export function mutexReducer (
    state = INIT_STATE["[@ngix/mutes]"],
    action: Action,
) {

    switch (action.type) {

        case actions.NEW_MUTEX:
            return { ...state, [action.payload.id]: action.payload };

        case actions.DELETE_MUTEX:
            const newState = { ...state };
            delete newState[action.payload.id];
            return newState;

        case actions.LOCK_MUTEX: {
            const mutex = state[action.payload.id];
            if (mutex !== undefined) {
                const count = mutex.count + 1;
                const locked = true;
                return { ...state, [action.payload.id]: { ...mutex, locked, count } };
            }
            return state;
        }

        case actions.UNLOCK_MUTEX: {
            const mutex = state[action.payload.id];
            if (mutex !== undefined) {
                const count = Math.max(0, mutex.count - 1);
                const locked = count > 0;
                return { ...state, [action.payload.id]: { ...mutex, locked, count } };
            }
            return state;
        }

        case actions.NEW_GUARD:
        case actions.DELETE_GUARD:
        default:
            return state;
    }
}
