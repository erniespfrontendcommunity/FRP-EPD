import { Component } from '@angular/core';
import { TabData } from './tab/tab.component';

enum TabIndices {
    FP_INTRODUCTION,
    FP_EXERCISE,
    RP_EXERCISE_1,
    RP_EXERCISE_2,
    FRP_SUBJECTS_EXERCISE_1,
    FRP_SUBJECTS_EXERCISE_2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    selectedTab = this.selectedTabFromStorage();

    TabIndices = TabIndices;

    tabs =  [
        {label: 'FP - Introduction', index:TabIndices.FP_INTRODUCTION},
        {label: 'FP - Exercise', index: TabIndices.FP_EXERCISE},
        {label: 'RP: Exercise 1', index:TabIndices.RP_EXERCISE_1},
        {label: 'RP: Exercise 2', index:TabIndices.RP_EXERCISE_2},
        {label: 'FRP: Exercise 1',  index:TabIndices.FRP_SUBJECTS_EXERCISE_1},
        {label: 'FRP: Exercise 2', index:TabIndices.FRP_SUBJECTS_EXERCISE_2}];

    selectTab(tab: TabData) {
        localStorage.setItem('selectedTab', ''+tab.index);
        this.selectedTab = tab.index;
    }

    selectedTabFromStorage(){
        return +localStorage.getItem('selectedTab') || 0;
    }
}