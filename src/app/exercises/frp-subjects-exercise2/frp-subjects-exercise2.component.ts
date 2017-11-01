import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'frp-subjects-exercise2',
  template: `<div class="content">
              <h2 class="subtitle">Highway's reactive control</h2>
              <vehicles-summary></vehicles-summary>
  </div>`,
    styleUrls: ['frp-exercise2.scss']
})
export class FRPSubjectsExercise2Component implements OnInit {

  ngOnInit() {
  }

}