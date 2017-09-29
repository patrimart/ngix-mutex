
import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";

import { Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";

import * as actions from "./actions";
import { Guard } from "./models";


@Injectable()
export class MutexEffects {

    @Effect({ dispatch: false }) newGuard$: Observable<Action> =
        this.actions$.ofType <actions.NewGuard> (actions.NEW_GUARD)
            .do(action => this.guards[action.payload.id] = action.payload);

    @Effect({ dispatch: false }) deleteGuard$: Observable<Action> =
        this.actions$.ofType <actions.DeleteGuard> (actions.DELETE_GUARD)
            .do(action => delete this.guards[action.payload.id]);

    @Effect() all$: Observable<Action> = this.actions$
        .mergeMap(() => {
            // Lookup Mutexes
            return from([
                new actions.LockMutex("id"),
                new actions.UnlockMutex("id"),
            ]);
        });

    private guards: { [id: string]: Guard } = {};

    constructor(
        private actions$: Actions,
    ) {}
}
