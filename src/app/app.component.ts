import { Component, Input } from '@angular/core';
import { StateLine } from './components/gantt-control/src/lib/interfaces/state-line';
import { StateType } from './components/gantt-control/src/lib/interfaces/state-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'component-hub';

}
