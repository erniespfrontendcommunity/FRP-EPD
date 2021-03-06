import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { RPExercise1Component } from './exercises/rp-exercise-1/rp-exercise-1.component';
import { RPExercise2Component } from './exercises/rp-exercise-2/rp-exercise-2.component';
import { FRPSubjectsExercise1Component } from './exercises/frp-subjects-exercise1/frp-subjects-exercise1.component';
import { FRPSubjectsExercise2Component } from './exercises/frp-subjects-exercise2/frp-subjects-exercise2.component';
import { FpExerciseComponent } from './exercises/fp-exercise/fp-exercise.component';
import { FpIntroductionComponent } from './exercises/fp-introduction/fp-introduction.component';
import { SummaryItemComponent } from './exercises/frp-subjects-exercise2/components/summary-item.component';
import { TextSummaryItemComponent } from './exercises/frp-subjects-exercise2/components/text-summary-item.component';
import { VehiclesSummaryComponent } from './exercises/frp-subjects-exercise2/components/vehicle-summary.component';
import { Service } from './exercises/frp-subjects-exercise2/utils/service';
import { VehicleMinuteSummaryComponent } from './exercises/frp-subjects-exercise2/components/vehicle-minute-summary.component';

@NgModule({
    declarations: [
        AppComponent,
        TabComponent,
        FpIntroductionComponent,
        FpExerciseComponent,
        RPExercise1Component,
        RPExercise2Component,
        FRPSubjectsExercise1Component,
        FRPSubjectsExercise2Component,
        SummaryItemComponent,
        TextSummaryItemComponent,
        VehiclesSummaryComponent,
        VehicleMinuteSummaryComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [Service],
    bootstrap: [AppComponent]
})
export class AppModule { }
