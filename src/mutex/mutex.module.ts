
import { NgModule } from "@angular/core";

import { MutexEffects } from "./effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";


@NgModule({
    imports: [
        StoreModule,
        EffectsModule,
    ],
    providers: [
        MutexEffects,
    ],
  })
  export class NgixMutexModule {}
